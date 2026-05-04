// API Service for NeoTrack Backend Integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://your-backend-url.onrender.com/api';

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Add auth token if available
  const token = localStorage.getItem('auth_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
}

// Authentication API
export const authAPI = {
  login: async (email: string, password: string, role: string) => {
    const response = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
    
    // Store auth token
    if (response.token) {
      localStorage.setItem('auth_token', response.token);
      localStorage.setItem('user_data', JSON.stringify(response.user));
    }
    
    return response;
  },

  register: async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: string;
    department: string;
    licenseNumber?: string;
    hospitalName: string;
  }) => {
    const response = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
  },

  getCurrentUser: () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },
};

// Babies API
export const babiesAPI = {
  getAll: async () => {
    return await apiRequest('/babies');
  },

  getById: async (id: number) => {
    return await apiRequest(`/babies/${id}`);
  },

  create: async (babyData: any) => {
    return await apiRequest('/babies', {
      method: 'POST',
      body: JSON.stringify(babyData),
    });
  },

  update: async (id: number, babyData: any) => {
    return await apiRequest(`/babies/${id}`, {
      method: 'PUT',
      body: JSON.stringify(babyData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/babies/${id}`, {
      method: 'DELETE',
    });
  },
};

// Shift Logs API
export const shiftLogsAPI = {
  getByBabyId: async (babyId: number) => {
    return await apiRequest(`/shift-logs/baby/${babyId}`);
  },

  create: async (shiftLogData: any) => {
    return await apiRequest('/shift-logs', {
      method: 'POST',
      body: JSON.stringify(shiftLogData),
    });
  },

  getAll: async () => {
    return await apiRequest('/shift-logs');
  },
};

// Parents API
export const parentsAPI = {
  create: async (parentData: any) => {
    return await apiRequest('/parents', {
      method: 'POST',
      body: JSON.stringify(parentData),
    });
  },

  getById: async (id: number) => {
    return await apiRequest(`/parents/${id}`);
  },
};

// Alerts API
export const alertsAPI = {
  getActive: async () => {
    return await apiRequest('/alerts/active');
  },

  getByBabyId: async (babyId: number) => {
    return await apiRequest(`/alerts/baby/${babyId}`);
  },

  resolve: async (alertId: number) => {
    return await apiRequest(`/alerts/${alertId}/resolve`, {
      method: 'POST',
    });
  },

  create: async (alertData: any) => {
    return await apiRequest('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  },
};

// Discharge Checklist API
export const dischargeAPI = {
  getByBabyId: async (babyId: number) => {
    return await apiRequest(`/discharge-checklist/baby/${babyId}`);
  },

  update: async (babyId: number, checklistData: any) => {
    return await apiRequest(`/discharge-checklist/baby/${babyId}`, {
      method: 'PUT',
      body: JSON.stringify(checklistData),
    });
  },

  markReady: async (babyId: number) => {
    return await apiRequest(`/discharge-checklist/baby/${babyId}/ready`, {
      method: 'POST',
    });
  },
};

// Admin/Statistics API
export const adminAPI = {
  getStats: async () => {
    return await apiRequest('/admin/stats');
  },

  getDailyAdmissions: async () => {
    return await apiRequest('/admin/daily-admissions');
  },

  getOutcomes: async () => {
    return await apiRequest('/admin/outcomes');
  },

  getUsers: async () => {
    return await apiRequest('/admin/users');
  },

  createUser: async (userData: any) => {
    return await apiRequest('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
};

// SMS API
export const smsAPI = {
  sendToParent: async (babyId: number, message: string) => {
    return await apiRequest('/sms/send', {
      method: 'POST',
      body: JSON.stringify({ babyId, message }),
    });
  },

  getHistory: async (babyId: number) => {
    return await apiRequest(`/sms/history/baby/${babyId}`);
  },
};

export default {
  authAPI,
  babiesAPI,
  shiftLogsAPI,
  parentsAPI,
  alertsAPI,
  dischargeAPI,
  adminAPI,
  smsAPI,
};

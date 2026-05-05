// API Service for NeoTrack Backend Integration

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://neotrack-backend-70bl.onrender.com/api';

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

// Alerts API
export const alertsAPI = {
  getAll: async () => {
    return await apiRequest('/alerts');
  },

  getActive: async () => {
    return await apiRequest('/alerts/active');
  },

  getById: async (id: number) => {
    return await apiRequest(`/alerts/${id}`);
  },

  create: async (alertData: any) => {
    return await apiRequest('/alerts', {
      method: 'POST',
      body: JSON.stringify(alertData),
    });
  },

  update: async (id: number, alertData: any) => {
    return await apiRequest(`/alerts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(alertData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/alerts/${id}`, {
      method: 'DELETE',
    });
  },

  resolve: async (alertId: number) => {
    return await apiRequest(`/alerts/${alertId}/resolve`, {
      method: 'POST',
    });
  },
};

// Parent Reports API
export const parentAPI = {
  submitReport: async (reportData: any) => {
    return await apiRequest('/parent-report', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  getReports: async () => {
    return await apiRequest('/parent-reports');
  },

  getReportsByBabyId: async (babyId: number) => {
    return await apiRequest(`/parent-reports/baby/${babyId}`);
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

  update: async (id: number, shiftLogData: any) => {
    return await apiRequest(`/shift-logs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(shiftLogData),
    });
  },

  delete: async (id: number) => {
    return await apiRequest(`/shift-logs/${id}`, {
      method: 'DELETE',
    });
  },
};

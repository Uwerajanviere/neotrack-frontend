# Backend Integration Guide

## 🚀 Quick Setup Steps

### Step 1: Configure Your Environment
1. **Get your friend's backend IP address**
   - Ask your friend for their IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Get the port number (e.g., 8000, 5000, 3001)

2. **Update your .env.local file:**
   ```env
   NEXT_PUBLIC_API_URL=http://YOUR_FRIENDS_IP:PORT
   NEXT_PUBLIC_API_BASE_URL=http://YOUR_FRIENDS_IP:PORT/api
   ```

### Step 2: What Your Friend Must Do on Backend

#### Enable CORS (Most Important!)
```javascript
// Add this to their main server file
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'http://YOUR_LAPTOP_IP:3000'],
  credentials: true
}));
```

#### Make Backend Accessible
```javascript
// Server must listen on 0.0.0.0 (not localhost)
app.listen(8000, '0.0.0.0', () => {
  console.log('Backend running on http://0.0.0.0:8000');
});
```

#### Required API Endpoints
Your friend needs these exact endpoints:

```
POST /api/auth/login
GET  /api/babies
POST /api/babies
GET  /api/babies/:id
PUT  /api/babies/:id
GET  /api/shift-logs/baby/:babyId
POST /api/shift-logs
GET  /api/alerts/active
POST /api/alerts
GET  /api/discharge-checklist/baby/:babyId
PUT  /api/discharge-checklist/baby/:babyId
GET  /api/admin/stats
```

### Step 3: Test Connection

#### 1. Test Backend is Reachable
```bash
curl http://YOUR_FRIENDS_IP:PORT/api/babies
```

#### 2. Test in Browser
Open `http://YOUR_FRIENDS_IP:PORT/api/babies` in your browser

#### 3. Test Login
Try logging in with valid credentials

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Error**
   - Backend must have CORS enabled
   - Check origin includes your localhost:3000

2. **Network Error**
   - Check if backend IP is correct
   - Verify port number
   - Ensure backend is running on 0.0.0.0

3. **Firewall Issues**
   - Windows: Allow port through Windows Firewall
   - Backend computer must allow incoming connections

4. **API Not Found (404)**
   - Check if API endpoints exist
   - Verify URL path matches exactly

### Debug Steps:

1. **Check Network Tab**
   - Open browser DevTools (F12)
   - Go to Network tab
   - Try login - see what error appears

2. **Test with Postman**
   - Create requests to test each endpoint
   - Verify backend responses

3. **Check Console Logs**
   - Look for error messages in browser console

## 📱 Final Working URL

Once connected:
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://YOUR_FRIENDS_IP:PORT`

## 🔄 API Response Format Expected

### Login Response
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "name": "Nurse Name",
    "email": "nurse@hospital.com",
    "role": "NURSE"
  }
}
```

### Babies Response
```json
[
  {
    "id": 1,
    "name": "Baby Jean",
    "gender": "Male",
    "birthWeight": 2.1,
    "gestationalAge": 34,
    "diagnosis": "Premature birth",
    "status": "STABLE",
    "admissionDate": "2024-01-15",
    "parentId": 1
  }
]
```

## 🚨 Important Notes

- **Security**: Never expose backend IP in production
- **HTTPS**: Use HTTPS in production, HTTP is fine for development
- **Authentication**: All API calls (except login) need the JWT token
- **Error Handling**: Backend should return proper error messages

## 📞 Support

If issues persist:
1. Check this guide first
2. Test each step methodically
3. Share exact error messages
4. Provide network screenshots if needed

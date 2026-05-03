# NeoTrack - NICU Management System

A comprehensive healthcare management system designed for Neonatal Intensive Care Units (NICU) in Rwanda. Built with Next.js, TypeScript, and Tailwind CSS for optimal performance and user experience.

## Features

### Core Functionality
- **Role-based Authentication**: Nurse, Doctor, and Admin access levels
- **Baby Registration**: Complete admission workflow with medical and parent information
- **Shift Logging**: Real-time vital signs tracking with danger value alerts
- **Medical History**: Comprehensive timeline of baby's progress
- **Discharge Management**: WHO-standard checklist for safe discharge
- **Alert System**: Visual warnings for critical conditions
- **SMS Notifications**: Parent communication system

### User Roles

#### Nurse Dashboard
- View all admitted babies with status indicators
- Quick access to shift update logging
- Baby registration form
- Real-time vital sign monitoring with danger alerts

#### Doctor Dashboard
- Comprehensive baby overview with charts
- Weight and temperature trend analysis
- Active alerts management
- Detailed medical history access

#### Admin Dashboard
- System statistics and analytics
- Daily admissions tracking
- Outcome reporting
- Staff management interface

## Tech Stack

- **Frontend**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **State Management**: React Hooks

## Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── admin/             # Admin dashboard
│   ├── baby/[babyId]/     # Baby detail pages
│   ├── doctor/            # Doctor dashboard
│   ├── nurse/             # Nurse dashboard and forms
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Login page
├── types/                 # TypeScript type definitions
│   └── index.ts          # Data models
└── components/            # Reusable components (when needed)
```

## Data Models

The system uses the following main entities:

- **Users**: Medical staff with role-based access
- **Babies**: Patient records with medical information
- **Parents**: Family contact information
- **Shift Logs**: Nursing care records and vital signs
- **Alerts**: Automated warning system
- **Discharge Checklists**: WHO discharge standards

## API Integration

This frontend is designed to integrate with your existing backend. Replace the mock data in each component with actual API calls:

### Example API Integration

```typescript
// Replace mock data with API calls
const response = await fetch('/api/babies')
const babies = await response.json()
```

### Authentication Flow

1. User submits login form
2. Verify credentials with backend
3. Store authentication token
4. Redirect to role-specific dashboard
5. Validate token on protected routes

### API Endpoints Expected

- `POST /api/auth/login` - User authentication
- `GET /api/babies` - List all babies
- `POST /api/babies` - Register new baby
- `GET /api/babies/:id` - Baby details
- `POST /api/shift-logs` - Log shift update
- `GET /api/alerts` - Active alerts
- `POST /api/discharge-checklist` - Update discharge status

## Responsive Design

The system is optimized for:
- **Tablet-first design** for nurse workflows
- **Mobile-friendly** interfaces
- **Large touch targets** for easy interaction
- **Clear visual hierarchy** for quick scanning

## Medical Safety Features

### Danger Value Alerts
- **Temperature < 36.5°C**: Red alert for hypothermia
- **Temperature > 37.5°C**: Yellow warning for fever
- **Weight < 1.5kg**: Red alert for low weight
- **Weight < 2.0kg**: Yellow warning for monitoring

### WHO Standards
- Discharge checklist follows WHO recommendations
- Vital sign ranges based on medical guidelines
- Parent education requirements included

## Customization

### Colors and Theming
Update `tailwind.config.js` to modify the medical theme:

```javascript
theme: {
  extend: {
    colors: {
      medical: {
        blue: '#3b82f6',    // Primary actions
        green: '#10b981',   // Success/stable
        red: '#ef4444',     // Danger/critical
        yellow: '#f59e0b',  // Warnings
      }
    }
  }
}
```

### Adding New Components
1. Create component in `src/components/`
2. Export from component file
3. Import and use in pages

## Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for environment-specific configuration:
```
NEXT_PUBLIC_API_URL=http://your-backend-url
NEXT_PUBLIC_SMS_SERVICE_URL=http://your-sms-service
```

## Security Considerations

- Input validation on all forms
- HTTPS for all API communications
- Secure token storage
- Role-based access control
- Medical data privacy compliance

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain responsive design principles
4. Test with medical workflow scenarios
5. Ensure accessibility compliance

## Support

For technical support or questions about the NeoTrack system, please refer to the project documentation or contact the development team.

---

**NeoTrack** - Improving neonatal care through technology in Rwanda.

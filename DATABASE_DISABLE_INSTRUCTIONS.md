# Database Disable Instructions for NeoTrack Backend

## 🚨 **IMPORTANT: Disable Database Before Deploying to Production**

### **Why You Need to Disable Database:**
- **H2 users** are hardcoded in frontend
- **No self-registration** system (login-only)
- **Fixed credentials** for nurse, doctor, admin
- **Database not needed** for demo/testing purposes

---

## 🔧 **How to Disable Database in Your Java Backend**

### **Option 1: Disable Database Connection (Recommended)**
```java
// In your application.properties or application.yml
spring.datasource.url=disabled
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
spring.h2.console.enabled=false
```

### **Option 2: Use H2 In-Memory Database**
```java
// In your application.properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.hibernate.ddl-auto=create-drop
```

### **Option 3: Comment Out Database Configuration**
```java
// Comment out these lines in your main application class:
/*
@Configuration
@EnableJpaRepositories
public class DatabaseConfig {
    // Your database configuration here
}
*/
```

---

## 👥 **Create Mock Users Service**

Create a mock service that returns fixed users:

```java
@Service
public class MockUserService {
    
    public User authenticate(String email, String password, String role) {
        // Fixed user credentials
        switch (role.toLowerCase()) {
            case "nurse":
                if (email.equals("nurse@hospital.com") && password.equals("password123")) {
                    return createNurseUser();
                }
                break;
            case "doctor":
                if (email.equals("doctor@hospital.com") && password.equals("password123")) {
                    return createDoctorUser();
                }
                break;
            case "admin":
                if (email.equals("admin@hospital.rw") && password.equals("password123")) {
                    return createAdminUser();
                }
                break;
        }
        return null;
    }
    
    private User createNurseUser() {
        User user = new User();
        user.setEmail("nurse@hospital.com");
        user.setRole("NURSE");
        user.setName("Sarah Nurse");
        user.setDepartment("NICU");
        return user;
    }
    
    private User createDoctorUser() {
        User user = new User();
        user.setEmail("doctor@hospital.com");
        user.setRole("DOCTOR");
        user.setName("Dr. John Smith");
        user.setDepartment("Pediatrics");
        return user;
    }
    
    private User createAdminUser() {
        User user = new User();
        user.setEmail("admin@hospital.rw");
        user.setRole("ADMIN");
        user.setName("Admin User");
        user.setDepartment("Administration");
        return user;
    }
}
```

---

## 🔐 **Security Benefits**

### **Why This is Secure:**
- **No database exposure** in production
- **Fixed credentials** only
- **No self-registration** security risk
- **Complete control** over user access
- **Easy testing** without database setup

---

## 🚀 **After Disabling Database:**

1. **Deploy backend** to Render
2. **Test endpoints**: `/api/auth/login`, `/api/babies`, etc.
3. **Verify frontend** connects successfully
4. **Monitor logs** for any issues

---

## ⚠️ **Production Deployment Checklist**

- [ ] Database disabled
- [ ] Mock users service implemented
- [ ] CORS configured for frontend URL
- [ ] All endpoints tested
- [ ] Backend deployed to Render

---

## 📞 **Need Help?**

If you need assistance implementing these changes, contact the frontend developer.

**Backend should be deployed with database disabled for secure, controlled access.**

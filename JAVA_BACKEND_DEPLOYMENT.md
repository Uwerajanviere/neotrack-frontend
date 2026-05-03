# Java Backend Deployment Guide - Render + Vercel

## 🚀 Complete Deployment Setup

### **For Your Friend (Java Backend on Render):**

#### **Step 1: Prepare Java Project**
```bash
# Make sure project has these files:
- pom.xml (Maven) or build.gradle (Gradle)
- src/main/java/ (your Java code)
- Procfile (required by Render)
```

#### **Step 2: Create Procfile**
Create file named `Procfile` (no extension):
```
web: java -jar target/your-app-name.jar
```

#### **Step 3: Update pom.xml for Render**
```xml
<build>
    <finalName>your-app-name</finalName>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <mainClass>com.yourpackage.YourApplication</mainClass>
            </configuration>
        </plugin>
    </plugins>
</build>
```

#### **Step 4: Add CORS for Production**
```java
// In your Spring Boot main class or configuration
@CrossOrigin(origins = {"https://your-vercel-url.vercel.app"})
@RestController
public class YourController {
    // your endpoints
}

// Or global CORS config
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("https://your-vercel-url.vercel.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```

#### **Step 5: Deploy to Render**
1. Go to [render.com](https://render.com)
2. Sign up and create "Web Service"
3. Connect to GitHub repository
4. Set these values:
   - **Runtime**: Java
   - **Build Command**: `mvn clean install`
   - **Start Command**: `java -jar target/your-app-name.jar`
   - **Plan**: Free tier
5. Deploy!

#### **Step 6: Get Backend URL**
Render will give URL like: `https://neotrack-backend.onrender.com`

---

### **For You (Frontend on Vercel):**

#### **Step 1: Push to GitHub**
```bash
git init
git add .
git commit -m "NeoTrack deployment ready"
git branch -M main
git remote add origin https://github.com/yourusername/neotrack.git
git push -u origin main
```

#### **Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Select your `neotrack` repository
5. Vercel auto-detects Next.js
6. Click "Deploy"

#### **Step 3: Set Environment Variables**
In Vercel dashboard → Settings → Environment Variables:
- `NEXT_PUBLIC_API_URL` = `https://neotrack-backend.onrender.com`
- `NEXT_PUBLIC_API_BASE_URL` = `https://neotrack-backend.onrender.com/api`

#### **Step 4: Update Friend's CORS**
Tell your friend your Vercel URL so they can update CORS:
```java
@CrossOrigin(origins = {"https://your-vercel-url.vercel.app"})
```

---

## 🔗 **Final URLs Example**

**After deployment:**
- **Frontend**: `https://neotrack.vercel.app`
- **Backend**: `https://neotrack-backend.onrender.com`

## 📱 **Access From Anywhere**

Once deployed, anyone can access:
- **Desktop**: `https://neotrack.vercel.app`
- **Mobile**: Same URL works on phones
- **Tablet**: Fully responsive design

## 🔧 **Common Java Issues & Solutions**

### **Issue 1: Port Binding**
```java
# In application.properties
server.port=${PORT:8080}
```

### **Issue 2: Database Connection**
```properties
# Use Render's database or add your own
spring.datasource.url=${DATABASE_URL}
```

### **Issue 3: Memory Issues**
```yaml
# In render.yaml
services:
  - type: web
    name: neotrack-backend
    env: java
    plan: free
    buildCommand: mvn clean install
    startCommand: java -Xmx512m -jar target/your-app-name.jar
```

## 🚨 **Important Notes**

1. **Free Tier Limitations**:
   - Render free tier sleeps after 15 minutes inactivity
   - Takes ~30 seconds to wake up
   - Vercel has no such limitations

2. **Security**:
   - Use HTTPS URLs
   - Don't commit API keys to GitHub
   - Use environment variables for secrets

3. **Testing**:
   - Test locally before deploying
   - Check Render logs for errors
   - Verify CORS is working

## 🎯 **Quick Checklist**

### **Your Friend (Java Backend):**
- [ ] Add Procfile
- [ ] Update pom.xml for production build
- [ ] Add CORS configuration
- [ ] Deploy to Render
- [ ] Get backend URL
- [ ] Update CORS with your Vercel URL

### **You (Frontend):**
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Set environment variables
- [ ] Test connection
- [ ] Share Vercel URL with friend for CORS update

## 🎉 **Result**

After completing these steps, you'll have:
- **Professional URLs** for both frontend and backend
- **Mobile-responsive** healthcare system
- **Global access** from anywhere
- **Free hosting** with custom domains possible

**Your NeoTrack system will be live and accessible to users worldwide!**

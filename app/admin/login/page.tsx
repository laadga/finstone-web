"use client";

import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple login logic - just redirect to dashboard
    router.push('/admin/dashboard');
  };
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #0B1C2C 0%, #1A2B3C 50%, #2A3B4C 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        padding: '30px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '8px' 
          }}>
            Finstone AI
          </h1>
          <p style={{ color: '#D1D5DB' }}>CRM & Admin Dashboard</p>
        </div>
        
        <h2 style={{ 
          fontSize: '24px', 
          color: 'white', 
          textAlign: 'center', 
          marginBottom: '24px' 
        }}>
          Sign In
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ 
              color: 'white', 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input 
              type="email" 
              placeholder="Enter your email"
              defaultValue="admin@finstone.ai"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              color: 'white', 
              display: 'block', 
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              Password
            </label>
            <input 
              type="password" 
              placeholder="Enter your password"
              defaultValue="password"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>
          
          <button 
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#3ABEFF',
              color: 'white',
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: '8px'
            }}
            onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2A9FD8'}
            onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3ABEFF'}
          >
            Sign In
          </button>
        </form>
        
        <div style={{ 
          marginTop: '24px', 
          paddingTop: '24px', 
          borderTop: '1px solid rgba(255, 255, 255, 0.2)' 
        }}>
          <p style={{ 
            fontSize: '12px', 
            color: '#D1D5DB', 
            textAlign: 'center', 
            marginBottom: '12px' 
          }}>
            Demo Credentials:
          </p>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '4px',
            fontSize: '12px',
            color: '#D1D5DB'
          }}>
            <div>Admin: admin@finstone.ai</div>
            <div>Sales: sales@finstone.ai</div>
            <div>Support: support@finstone.ai</div>
          </div>
        </div>
      </div>
    </div>
  );
}

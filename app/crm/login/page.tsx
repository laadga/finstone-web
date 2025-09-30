"use client";

export default function CRMLoginPage() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f8ff', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '400px', 
        width: '100%' 
      }}>
        {/* Back to Website */}
        <div style={{ marginBottom: '20px' }}>
          <a 
            href="/" 
            style={{ 
              display: 'flex',
              alignItems: 'center',
              color: '#666',
              textDecoration: 'none',
              fontSize: '14px'
            }}
          >
            ← Back to Website
          </a>
        </div>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            backgroundColor: '#007bff', 
            borderRadius: '15px', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 15px'
          }}>
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>F</span>
          </div>
          <h1 style={{ fontSize: '24px', color: '#333', margin: '0 0 5px 0' }}>Finstone CRM</h1>
          <p style={{ color: '#666', margin: '0' }}>Sign in to your dashboard</p>
        </div>

        {/* Login Form */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '15px', 
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <form style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#333', 
                marginBottom: '8px' 
              }}>
                Email
              </label>
              <input
                type="email"
                defaultValue="admin@finstone.test"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your email"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#333', 
                marginBottom: '8px' 
              }}>
                Password
              </label>
              <input
                type="password"
                defaultValue="password"
                style={{ 
                  width: '100%', 
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}
                placeholder="Enter your password"
              />
            </div>

            <button
              type="button"
              onClick={() => window.location.href = '/crm'}
              style={{ 
                width: '100%', 
                backgroundColor: '#007bff', 
                color: 'white', 
                padding: '12px', 
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
          </form>

          {/* Demo Users */}
          <div style={{ 
            marginTop: '20px', 
            paddingTop: '20px', 
            borderTop: '1px solid #eee' 
          }}>
            <p style={{ 
              fontSize: '14px', 
              color: '#666', 
              textAlign: 'center', 
              marginBottom: '15px' 
            }}>
              Or try a demo account:
            </p>
            <div style={{ marginBottom: '15px' }}>
              <button
                onClick={() => window.location.href = '/crm'}
                style={{ 
                  width: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}
              >
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>Alex Founder</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>admin@finstone.test</div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#f0f0f0', 
                  color: '#666', 
                  padding: '4px 8px', 
                  borderRadius: '12px' 
                }}>
                  admin
                </div>
              </button>
              
              <button
                onClick={() => window.location.href = '/crm'}
                style={{ 
                  width: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  marginBottom: '8px'
                }}
              >
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>Maya Sales</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>sales@finstone.test</div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#f0f0f0', 
                  color: '#666', 
                  padding: '4px 8px', 
                  borderRadius: '12px' 
                }}>
                  sales
                </div>
              </button>
              
              <button
                onClick={() => window.location.href = '/crm'}
                style={{ 
                  width: '100%', 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px', 
                  border: '1px solid #ddd', 
                  borderRadius: '8px',
                  backgroundColor: 'white',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <div style={{ fontWeight: '500', color: '#333' }}>Jon Support</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>support@finstone.test</div>
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#f0f0f0', 
                  color: '#666', 
                  padding: '4px 8px', 
                  borderRadius: '12px' 
                }}>
                  support
                </div>
              </button>
            </div>
          </div>

          {/* Demo Info */}
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: '#e6f3ff', 
            borderRadius: '8px' 
          }}>
            <p style={{ 
              fontSize: '12px', 
              color: '#0066cc', 
              margin: '0' 
            }}>
              <strong>Demo Mode:</strong> All demo accounts use password "password". 
              This is a mock authentication system for demonstration purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
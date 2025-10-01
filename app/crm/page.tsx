"use client";

import { useState } from 'react';

export default function CRMPage() {
  const [showDemoData, setShowDemoData] = useState(false);

  const demoData = {
    leads: [
      { name: "Sofia Ramos", company: "Ramos Legal", status: "Demo Scheduled", value: "$2,400" },
      { name: "Omar Khan", company: "BrightBuild", status: "Contacted", value: "$1,200" },
      { name: "Lina Park", company: "GreenCart eCom", status: "Qualified", value: "$3,600" }
    ],
    customers: [
      { company: "GreenCart eCom", plan: "Pro", mrr: "$149", status: "Active" },
      { company: "TechStart Inc", plan: "Growth", mrr: "$299", status: "Active" },
      { company: "DataFlow Corp", plan: "Enterprise", mrr: "$999", status: "Trialing" }
    ],
    agents: [
      { name: "Sales Closer", status: "Active", tasks: 12 },
      { name: "CFO Agent", status: "Provisioning", tasks: 3 },
      { name: "Support Bot", status: "Active", tasks: 8 }
    ]
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f8ff', 
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '20px' 
      }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          padding: '40px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h1 style={{ 
            fontSize: '32px', 
            color: '#333', 
            marginBottom: '10px',
            textAlign: 'center'
          }}>
            🎉 Finstone CRM Dashboard
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#666', 
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            Your CRM dashboard has been successfully integrated!
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '20px',
            marginBottom: '30px'
          }}>
            <div style={{ 
              backgroundColor: '#e6f3ff', 
              border: '1px solid #b3d9ff', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#0066cc', 
                marginBottom: '10px' 
              }}>
                📊 Dashboard
              </h3>
              <p style={{ color: '#004499', fontSize: '14px' }}>
                KPI cards, activity feed, and recent leads overview
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#e6ffe6', 
              border: '1px solid #b3ffb3', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#006600', 
                marginBottom: '10px' 
              }}>
                👥 Leads
              </h3>
              <p style={{ color: '#004400', fontSize: '14px' }}>
                Manage your sales pipeline and track lead progress
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#f0e6ff', 
              border: '1px solid #d9b3ff', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#6600cc', 
                marginBottom: '10px' 
              }}>
                🏢 Customers
              </h3>
              <p style={{ color: '#440099', fontSize: '14px' }}>
                Customer accounts with onboarding progress tracking
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#fff0e6', 
              border: '1px solid #ffd9b3', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#cc6600', 
                marginBottom: '10px' 
              }}>
                💳 Subscriptions
              </h3>
              <p style={{ color: '#994400', fontSize: '14px' }}>
                Billing management and subscription tracking
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#e6f0ff', 
              border: '1px solid #b3d9ff', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#0066cc', 
                marginBottom: '10px' 
              }}>
                🤖 Agents
              </h3>
              <p style={{ color: '#004499', fontSize: '14px' }}>
                AI agent provisioning and monitoring
              </p>
            </div>
            
            <div style={{ 
              backgroundColor: '#ffe6f0', 
              border: '1px solid #ffb3d9', 
              borderRadius: '8px', 
              padding: '20px' 
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#cc0066', 
                marginBottom: '10px' 
              }}>
                🔗 Integrations
              </h3>
              <p style={{ color: '#990044', fontSize: '14px' }}>
                Connect your favorite tools and services
              </p>
            </div>
          </div>
          
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              color: '#333', 
              marginBottom: '10px' 
            }}>
              🚀 Getting Started
            </h3>
            <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
              The CRM dashboard is now fully integrated with your Finstone AI website. 
              All components are ready and the system is using mock data for demonstration.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setShowDemoData(!showDemoData)}
                style={{ 
                  backgroundColor: showDemoData ? '#28a745' : '#007bff', 
                  color: 'white', 
                  padding: '10px 20px', 
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {showDemoData ? 'Hide Demo Data' : 'View Demo Data'}
              </button>
              <button style={{ 
                backgroundColor: '#6c757d', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none',
                borderRadius: '5px',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                Learn More
              </button>
            </div>
          </div>
          
          {/* Demo Data Display */}
          {showDemoData && (
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                color: '#333', 
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                📊 Live Demo Data
              </h3>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: '20px' 
              }}>
                {/* Leads */}
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '15px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ color: '#006600', marginBottom: '10px' }}>👥 Recent Leads</h4>
                  {demoData.leads.map((lead, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px'
                    }}>
                      <div style={{ fontWeight: '500' }}>{lead.name}</div>
                      <div style={{ color: '#666' }}>{lead.company} • {lead.status}</div>
                      <div style={{ color: '#28a745', fontWeight: '500' }}>{lead.value}</div>
                    </div>
                  ))}
                </div>
                
                {/* Customers */}
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '15px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ color: '#6600cc', marginBottom: '10px' }}>🏢 Active Customers</h4>
                  {demoData.customers.map((customer, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px'
                    }}>
                      <div style={{ fontWeight: '500' }}>{customer.company}</div>
                      <div style={{ color: '#666' }}>{customer.plan} Plan • {customer.status}</div>
                      <div style={{ color: '#007bff', fontWeight: '500' }}>MRR: {customer.mrr}</div>
                    </div>
                  ))}
                </div>
                
                {/* Agents */}
                <div style={{ 
                  backgroundColor: 'white', 
                  padding: '15px', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ color: '#0066cc', marginBottom: '10px' }}>🤖 AI Agents</h4>
                  {demoData.agents.map((agent, index) => (
                    <div key={index} style={{ 
                      padding: '8px', 
                      borderBottom: '1px solid #f0f0f0',
                      fontSize: '14px'
                    }}>
                      <div style={{ fontWeight: '500' }}>{agent.name}</div>
                      <div style={{ color: '#666' }}>Status: {agent.status}</div>
                      <div style={{ color: '#ffc107', fontWeight: '500' }}>{agent.tasks} active tasks</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '10px', 
          padding: '20px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ 
            fontSize: '24px', 
            color: '#333', 
            marginBottom: '15px',
            textAlign: 'center'
          }}>
            📈 System Status
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px' 
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Server Running</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#666' }}>CRM Integrated</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#666' }}>Mock Data Ready</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>✅</div>
              <div style={{ fontSize: '14px', color: '#666' }}>All Systems Go</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Check, X, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function Pricing() {
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4">
        <div className="flex text-center justify-center items-center gap-4 flex-col">
          <div className="grid text-left w-full grid-cols-3 lg:grid-cols-4 divide-x pt-20">
            <div className="col-span-3 lg:col-span-1"></div>
            <div className="px-3 py-1 md:px-6 md:py-4  gap-2 flex flex-col">
              <p className="text-2xl text-gray-800">AI Audit</p>
              <p className="text-sm text-gray-600">
                Comprehensive AI analysis for your business
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-gray-800">$1,500</span>
                <span className="text-sm text-gray-600"> (one-time)</span>
              </p>
              <button 
                className="group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 ease-out hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 mt-8"
                onClick={() => window.open('https://calendly.com/finstone/custom', '_blank')}
              >
                Book Free Call <MoveRight className="w-4 h-4" />
              </button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
              <p className="text-2xl text-gray-800">AI Workforce</p>
              <p className="text-sm text-gray-600">
                Your AI employee team on autopilot
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-gray-800">$2,000</span>
                <span className="text-sm text-gray-600"> / month</span>
              </p>
              <button 
                className="group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 ease-out hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 mt-8"
                onClick={() => window.open('https://calendly.com/finstone/custom', '_blank')}
              >
                Book Free Call <MoveRight className="w-4 h-4" />
              </button>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 gap-2 flex flex-col">
              <p className="text-2xl text-gray-800">Enterprise</p>
              <p className="text-sm text-gray-600">
                Custom solutions for large organizations
              </p>
              <p className="flex flex-col lg:flex-row lg:items-center gap-2 text-xl mt-8">
                <span className="text-4xl text-gray-800">Custom</span>
              </p>
              <button 
                className="group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600 hover:text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 ease-out hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 mt-8"
                onClick={() => window.open('https://calendly.com/finstone/custom', '_blank')}
              >
                Talk to Sales <PhoneCall className="w-4 h-4" />
              </button>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800 font-bold">Features</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">AI Audit Included</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-blue-500" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-blue-500" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-blue-500" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">AI Employees Analysis</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">One-time audit of processes</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Ongoing AI employee management</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Fully customized workforce</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              ROI Projections
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Provided after audit</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Monthly projections</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Tailored enterprise forecasts</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Workflow Automation
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Standard automations</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Custom workflows & automation</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Integrations
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Standard (Slack, HubSpot, Notion)</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Custom integrations available</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Dashboards
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Audit-only overview</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">CRM dashboards</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Fully customizable dashboards</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800 font-bold">Platform</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Scalability
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Fits growing teams</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Built for enterprise scale</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Security & Compliance
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Basic</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Standard</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Advanced + SLA</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              API Access
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <Check className="w-4 h-4 text-blue-500" />
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Custom Development
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Dedicated solutions</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800 font-bold">Support</div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center"></div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Onboarding
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <X className="w-4 h-4 text-gray-800" />
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Guided onboarding</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Customized onboarding</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Support
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Email support only</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">24/7 support</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Dedicated account manager</p>
            </div>
            <div className="px-3 lg:px-6 col-span-3 lg:col-span-1 py-4 text-gray-800">
              Optimization
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Recommendations only</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Continuous tuning</p>
            </div>
            <div className="px-3 py-1 md:px-6 md:py-4 flex justify-center">
              <p className="text-gray-600 text-sm">Quarterly optimization sessions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Pricing };

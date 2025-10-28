import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Mail, 
  Shield, 
  Database, 
  Globe, 
  Bell, 
  Key, 
  Server,
  Save,
  RefreshCw
} from "lucide-react"

export const metadata: Metadata = {
  title: "System Settings",
  description: "System configuration and administrative settings.",
}

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure system-wide settings and administrative preferences.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
          <CardDescription>
            Basic system configuration and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="app-name">Application Name</Label>
              <Input
                id="app-name"
                defaultValue="Micro SaaS Platform"
                placeholder="Enter application name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="app-url">Application URL</Label>
              <Input
                id="app-url"
                defaultValue="https://app.microsaas.com"
                placeholder="Enter application URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                defaultValue="support@microsaas.com"
                placeholder="Enter support email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Default Timezone</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
                <option value="Europe/London">London</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Configuration
          </CardTitle>
          <CardDescription>
            SMTP settings and email delivery configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="smtp-host">SMTP Host</Label>
              <Input
                id="smtp-host"
                defaultValue="smtp.mailgun.org"
                placeholder="Enter SMTP host"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-port">SMTP Port</Label>
              <Input
                id="smtp-port"
                type="number"
                defaultValue="587"
                placeholder="Enter SMTP port"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-username">SMTP Username</Label>
              <Input
                id="smtp-username"
                defaultValue="postmaster@mg.microsaas.com"
                placeholder="Enter SMTP username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtp-password">SMTP Password</Label>
              <Input
                id="smtp-password"
                type="password"
                defaultValue="••••••••••••"
                placeholder="Enter SMTP password"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-green-700 bg-green-100">
              Connected
            </Badge>
            <Button variant="outline" size="sm">
              Test Connection
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Authentication and security configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div>
                <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Require 2FA for admin accounts</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-green-700 bg-green-100 dark:bg-green-900/30 dark:text-green-400">
                  Enabled
                </Badge>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div>
                <h4 className="font-medium text-foreground">Session Timeout</h4>
                <p className="text-sm text-muted-foreground">Automatic logout after inactivity</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="px-3 py-1 border border-input rounded text-sm bg-background text-foreground">
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="120">2 hours</option>
                  <option value="480">8 hours</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div>
                <h4 className="font-medium text-foreground">Password Policy</h4>
                <p className="text-sm text-muted-foreground">Minimum password requirements</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">8+ chars, symbols</Badge>
                <Button variant="outline" size="sm">
                  Edit Policy
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>
            API settings and rate limiting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rate-limit">Rate Limit (requests/minute)</Label>
              <Input
                id="rate-limit"
                type="number"
                defaultValue="1000"
                placeholder="Enter rate limit"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-version">Default API Version</Label>
              <select className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm">
                <option value="v1">v1 (Current)</option>
                <option value="v2">v2 (Beta)</option>
              </select>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-3">
            <h4 className="font-medium">API Keys</h4>
            <div className="space-y-2">
              <ApiKeyItem
                name="Master API Key"
                key="sk_live_••••••••••••••••••••••••••••••••"
                created="2024-01-01"
                lastUsed="2024-01-15"
                status="active"
              />
              <ApiKeyItem
                name="Webhook API Key"
                key="sk_webhook_••••••••••••••••••••••••••••"
                created="2024-01-10"
                lastUsed="2024-01-14"
                status="active"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Database Settings
          </CardTitle>
          <CardDescription>
            Database configuration and maintenance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg text-center bg-card">
              <h4 className="font-medium mb-2 text-foreground">Database Size</h4>
              <p className="text-2xl font-bold text-blue-600">2.4 GB</p>
              <p className="text-sm text-muted-foreground">Total storage used</p>
            </div>
            <div className="p-4 border border-border rounded-lg text-center bg-card">
              <h4 className="font-medium mb-2 text-foreground">Backup Status</h4>
              <p className="text-2xl font-bold text-green-600">✓</p>
              <p className="text-sm text-muted-foreground">Last: 2 hours ago</p>
            </div>
            <div className="p-4 border border-border rounded-lg text-center bg-card">
              <h4 className="font-medium mb-2 text-foreground">Connections</h4>
              <p className="text-2xl font-bold text-purple-600">23</p>
              <p className="text-sm text-muted-foreground">Active connections</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Run Backup
            </Button>
            <Button variant="outline" size="sm">
              Optimize Tables
            </Button>
            <Button variant="outline" size="sm">
              View Logs
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>
            System alerts and notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <NotificationToggle
              title="System Alerts"
              description="Critical system errors and downtime"
              enabled={true}
            />
            <NotificationToggle
              title="Security Events"
              description="Failed logins and security incidents"
              enabled={true}
            />
            <NotificationToggle
              title="Billing Notifications"
              description="Payment failures and subscription changes"
              enabled={true}
            />
            <NotificationToggle
              title="User Activity"
              description="New registrations and user actions"
              enabled={false}
            />
            <NotificationToggle
              title="Performance Alerts"
              description="High resource usage and slow responses"
              enabled={true}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface ApiKeyItemProps {
  name: string
  key: string
  created: string
  lastUsed: string
  status: "active" | "inactive"
}

function ApiKeyItem({ name, key, created, lastUsed, status }: ApiKeyItemProps) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-foreground">{name}</span>
          <Badge variant={status === "active" ? "secondary" : "outline"}>
            {status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground font-mono">{key}</p>
        <p className="text-xs text-muted-foreground">
          Created: {created} • Last used: {lastUsed}
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm">
          Rotate
        </Button>
        <Button variant="outline" size="sm">
          Revoke
        </Button>
      </div>
    </div>
  )
}

interface NotificationToggleProps {
  title: string
  description: string
  enabled: boolean
}

function NotificationToggle({ title, description, enabled }: NotificationToggleProps) {
  return (
    <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
      <div>
        <h4 className="font-medium text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          defaultChecked={enabled}
          className="rounded border-input"
        />
        <span className="text-sm text-muted-foreground">
          {enabled ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  )
}
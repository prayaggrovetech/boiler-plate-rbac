"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Server, FileText, Save, TestTube } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function EmailSettingsPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  
  // SMTP Settings
  const [smtpSettings, setSmtpSettings] = useState({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    user: "",
    password: "",
    fromName: "Micro SaaS",
    fromEmail: "",
  })

  // Email Templates
  const [templates, setTemplates] = useState<any[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Load SMTP settings
  useEffect(() => {
    loadSmtpSettings()
    loadEmailTemplates()
  }, [])

  const loadSmtpSettings = async () => {
    try {
      const response = await fetch("/api/admin/smtp-settings")
      if (response.ok) {
        const data = await response.json()
        if (data.settings) {
          setSmtpSettings(data.settings)
        }
      }
    } catch (error) {
      console.error("Failed to load SMTP settings:", error)
    }
  }

  const loadEmailTemplates = async () => {
    try {
      const response = await fetch("/api/admin/email-templates")
      if (response.ok) {
        const data = await response.json()
        setTemplates(data.templates || [])
        if (data.templates?.length > 0) {
          setSelectedTemplate(data.templates[0])
        }
      }
    } catch (error) {
      console.error("Failed to load email templates:", error)
    }
  }

  const handleSaveSmtp = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/admin/smtp-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(smtpSettings),
      })

      if (response.ok) {
        toast({
          title: "SMTP Settings Saved",
          description: "Email configuration has been updated successfully.",
        })
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to save settings")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save SMTP settings",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestEmail = async () => {
    setIsTesting(true)
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: smtpSettings.user }),
      })

      if (response.ok) {
        toast({
          title: "Test Email Sent",
          description: `A test email has been sent to ${smtpSettings.user}`,
        })
      } else {
        throw new Error("Failed to send test email")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Test Failed",
        description: "Failed to send test email. Check your SMTP settings.",
      })
    } finally {
      setIsTesting(false)
    }
  }

  const handleSaveTemplate = async () => {
    if (!selectedTemplate) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/admin/email-templates/${selectedTemplate.name}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: selectedTemplate.subject,
          htmlContent: selectedTemplate.htmlContent,
          textContent: selectedTemplate.textContent,
          isActive: selectedTemplate.isActive,
        }),
      })

      if (response.ok) {
        toast({
          title: "Template Saved",
          description: "Email template has been updated successfully.",
        })
        loadEmailTemplates()
      } else {
        const data = await response.json()
        throw new Error(data.error || "Failed to save template")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: error instanceof Error ? error.message : "Failed to save template",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Email Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure SMTP settings and manage email templates
        </p>
      </div>

      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList>
          <TabsTrigger value="smtp">
            <Server className="h-4 w-4 mr-2" />
            SMTP Configuration
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="h-4 w-4 mr-2" />
            Email Templates
          </TabsTrigger>
        </TabsList>

        {/* SMTP Configuration Tab */}
        <TabsContent value="smtp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                SMTP Server Settings
              </CardTitle>
              <CardDescription>
                Configure your email server settings. For Gmail, use an App Password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="host">SMTP Host</Label>
                  <Input
                    id="host"
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="port">SMTP Port</Label>
                  <Input
                    id="port"
                    type="number"
                    value={smtpSettings.port}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
                    placeholder="587"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="user">SMTP Username (Email)</Label>
                  <Input
                    id="user"
                    type="email"
                    value={smtpSettings.user}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, user: e.target.value })}
                    placeholder="your-email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">SMTP Password (App Password)</Label>
                  <Input
                    id="password"
                    type="password"
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
                    placeholder="Enter app password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromName">From Name</Label>
                  <Input
                    id="fromName"
                    value={smtpSettings.fromName}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromName: e.target.value })}
                    placeholder="Micro SaaS"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input
                    id="fromEmail"
                    type="email"
                    value={smtpSettings.fromEmail}
                    onChange={(e) => setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })}
                    placeholder="noreply@example.com"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="secure"
                  checked={smtpSettings.secure}
                  onCheckedChange={(checked: boolean) => setSmtpSettings({ ...smtpSettings, secure: checked })}
                />
                <Label htmlFor="secure">Use SSL/TLS (Port 465)</Label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleSaveSmtp} disabled={isLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Settings"}
                </Button>
                <Button variant="outline" onClick={handleTestEmail} disabled={isTesting}>
                  <TestTube className="h-4 w-4 mr-2" />
                  {isTesting ? "Sending..." : "Send Test Email"}
                </Button>
              </div>

              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-100 font-medium mb-2">
                  📧 Gmail Setup Instructions:
                </p>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-decimal list-inside">
                  <li>Enable 2-Factor Authentication on your Google Account</li>
                  <li>Visit: <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer" className="underline">Google App Passwords</a></li>
                  <li>Generate an App Password for "Mail"</li>
                  <li>Copy the 16-character password and paste it above</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Template List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={selectedTemplate?.id === template.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    {template.name.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Template Editor */}
            {selectedTemplate && (
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>
                    {selectedTemplate.name.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </CardTitle>
                  <CardDescription>{selectedTemplate.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Available Variables</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.variables?.map((variable: string) => (
                        <code key={variable} className="px-2 py-1 bg-muted rounded text-sm">
                          {`{{${variable}}}`}
                        </code>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject Line</Label>
                    <Input
                      id="subject"
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="htmlContent">HTML Content</Label>
                    <Textarea
                      id="htmlContent"
                      value={selectedTemplate.htmlContent}
                      onChange={(e) => setSelectedTemplate({ ...selectedTemplate, htmlContent: e.target.value })}
                      rows={15}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="textContent">Plain Text Content</Label>
                    <Textarea
                      id="textContent"
                      value={selectedTemplate.textContent}
                      onChange={(e) => setSelectedTemplate({ ...selectedTemplate, textContent: e.target.value })}
                      rows={10}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={selectedTemplate.isActive}
                      onCheckedChange={(checked: boolean) => setSelectedTemplate({ ...selectedTemplate, isActive: checked })}
                    />
                    <Label htmlFor="isActive">Template Active</Label>
                  </div>

                  <Button onClick={handleSaveTemplate} disabled={isLoading}>
                    <Save className="h-4 w-4 mr-2" />
                    {isLoading ? "Saving..." : "Save Template"}
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

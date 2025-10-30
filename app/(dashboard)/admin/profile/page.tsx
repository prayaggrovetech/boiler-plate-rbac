"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Shield,
    Key,
    Bell,
    Save,
    Edit,
    Settings
} from "lucide-react"
import { useSession } from "next-auth/react"
import { useProfileUpdate } from "@/hooks/use-profile-update"

export default function AdminProfile() {
    const { data: session } = useSession()
    const { updateProfile, isLoading } = useProfileUpdate()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        name: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "",
        location: "",
        bio: ""
    })

    // Load profile data on mount
    useEffect(() => {
        const loadProfile = async () => {
            try {
                const response = await fetch("/api/profile")
                if (response.ok) {
                    const data = await response.json()
                    setFormData({
                        name: data.name || "",
                        email: data.email || "",
                        phone: data.phone || "",
                        location: data.location || "",
                        bio: data.bio || "",
                    })
                }
            } catch (error) {
                console.error("Failed to load profile:", error)
            }
        }

        if (session?.user) {
            loadProfile()
        }
    }, [session])

    const handleSave = async () => {
        const result = await updateProfile({
            name: formData.name,
            phone: formData.phone,
            location: formData.location,
            bio: formData.bio,
        })

        if (result.success && result.data) {
            // Update local form data with the API response
            setFormData({
                name: result.data.name || "",
                email: result.data.email || "",
                phone: result.data.phone || "",
                location: result.data.location || "",
                bio: result.data.bio || "",
            })
            setIsEditing(false)
        }
    }

    const handleCancel = () => {
        setFormData({
            name: session?.user?.name || "",
            email: session?.user?.email || "",
            phone: "",
            location: "",
            bio: ""
        })
        setIsEditing(false)
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Admin Profile</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your administrator account information and preferences
                    </p>
                </div>
                <div className="flex gap-3">
                    {isEditing ? (
                        <>
                            <Button variant="outline" onClick={handleCancel} disabled={isLoading}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={isLoading}>
                                <Save className="h-4 w-4 mr-2" />
                                {isLoading ? "Saving..." : "Save Changes"}
                            </Button>
                        </>
                    ) : (
                        <Button onClick={() => setIsEditing(true)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Profile
                        </Button>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Information */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Basic Information
                            </CardTitle>
                            <CardDescription>
                                Your personal information and contact details
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                                        disabled={!isEditing}
                                        placeholder="Enter your phone number"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                                        disabled={!isEditing}
                                        placeholder="City, Country"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <textarea
                                    id="bio"
                                    className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={formData.bio}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                                    disabled={!isEditing}
                                    placeholder="Tell us about yourself..."
                                />
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
                                Manage your account security and authentication
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                                <div className="flex items-center gap-3">
                                    <Key className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-foreground">Password</p>
                                        <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    Change Password
                                </Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                                        <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                                    </div>
                                </div>
                                <Badge variant="success" className="text-xs">Enabled</Badge>
                            </div>

                            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
                                <div className="flex items-center gap-3">
                                    <Key className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                        <p className="font-medium text-foreground">API Access</p>
                                        <p className="text-sm text-muted-foreground">Manage your API keys</p>
                                    </div>
                                </div>
                                <Button variant="outline" size="sm">
                                    View Keys
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Preferences */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Settings className="h-5 w-5" />
                                Admin Preferences
                            </CardTitle>
                            <CardDescription>
                                Customize your admin dashboard experience
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Email Notifications</p>
                                        <p className="text-sm text-muted-foreground">Receive system alerts via email</p>
                                    </div>
                                    <input type="checkbox" className="rounded border-input" defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">Security Alerts</p>
                                        <p className="text-sm text-muted-foreground">Critical security notifications</p>
                                    </div>
                                    <input type="checkbox" className="rounded border-input" defaultChecked />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">User Activity Alerts</p>
                                        <p className="text-sm text-muted-foreground">New user registrations and actions</p>
                                    </div>
                                    <input type="checkbox" className="rounded border-input" />
                                </div>
                                <Separator />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-foreground">System Performance Alerts</p>
                                        <p className="text-sm text-muted-foreground">High resource usage warnings</p>
                                    </div>
                                    <input type="checkbox" className="rounded border-input" defaultChecked />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Profile Summary */}
                <div className="space-y-6">
                    {/* Profile Card */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="text-center space-y-4">
                                <div className="w-24 h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
                                    <User className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-foreground">{session?.user?.name || "Admin User"}</h3>
                                    <p className="text-muted-foreground">{session?.user?.email}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {session?.user?.roles?.map((role: any) => (
                                        <Badge key={role.id} variant="secondary">
                                            {role.name}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Stats */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Account Statistics</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">Member since</span>
                                </div>
                                <span className="text-sm font-medium text-foreground">Jan 2024</span>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">Email verified</span>
                                </div>
                                <Badge variant="success" className="text-xs">Verified</Badge>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Shield className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">Account status</span>
                                </div>
                                <Badge variant="success" className="text-xs">Active</Badge>
                            </div>
                            <Separator />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Key className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-sm text-foreground">2FA Status</span>
                                </div>
                                <Badge variant="success" className="text-xs">Enabled</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Admin Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full justify-start" size="sm">
                                <Settings className="h-4 w-4 mr-2" />
                                System Settings
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                                <Shield className="h-4 w-4 mr-2" />
                                Security Logs
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                                <Key className="h-4 w-4 mr-2" />
                                API Keys
                            </Button>
                            <Button variant="outline" className="w-full justify-start" size="sm">
                                <Bell className="h-4 w-4 mr-2" />
                                Notification Settings
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Admin Permissions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Permissions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {session?.user?.permissions?.slice(0, 5).map((permission: string, index: number) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-foreground">{permission}</span>
                                    </div>
                                ))}
                                {session?.user?.permissions && session.user.permissions.length > 5 && (
                                    <Button variant="link" size="sm" className="p-0 h-auto">
                                        View all {session.user.permissions.length} permissions
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

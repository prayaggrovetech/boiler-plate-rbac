import * as React from "react"
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Input,
  Label,
  Select,
  Checkbox,
  Textarea,
  FormField,
  Spinner,
  Skeleton,
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  useToast
} from "./index"
import { AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

export function UIComponentDemo() {
  const { toast } = useToast()
  const [loading, setLoading] = React.useState(false)

  const handleToast = (variant: "default" | "destructive" | "success" | "warning") => {
    toast({
      variant,
      title: `${variant.charAt(0).toUpperCase() + variant.slice(1)} Toast`,
      description: `This is a ${variant} toast notification.`,
    })
  }

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">UI Component Library Demo</h1>
        <p className="text-muted-foreground">
          A showcase of all available UI components in the micro SaaS boilerplate.
        </p>
      </div>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Various button variants and states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">🚀</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button loading={loading} onClick={handleLoadingDemo}>
              {loading ? "Loading..." : "Click to Load"}
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>

      {/* Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Cards</CardTitle>
          <CardDescription>Card components with header, content, and footer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sample Card</CardTitle>
                <CardDescription>This is a sample card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Card content goes here. This can contain any type of content.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Card>
        <CardHeader>
          <CardTitle>Modal</CardTitle>
          <CardDescription>Modal dialog component</CardDescription>
        </CardHeader>
        <CardContent>
          <Modal>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent>
              <ModalHeader>
                <ModalTitle>Sample Modal</ModalTitle>
                <ModalDescription>
                  This is a sample modal dialog. You can put any content here.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                <p>Modal content goes here...</p>
              </div>
              <ModalFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </CardContent>
      </Card>

      {/* Form Components */}
      <Card>
        <CardHeader>
          <CardTitle>Form Components</CardTitle>
          <CardDescription>Input fields, selects, checkboxes, and more</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField label="Text Input" required>
            <Input placeholder="Enter some text..." />
          </FormField>
          
          <FormField label="Email Input" error="Please enter a valid email">
            <Input type="email" placeholder="email@example.com" />
          </FormField>

          <FormField label="Select Option">
            <Select
              options={[
                { value: "option1", label: "Option 1" },
                { value: "option2", label: "Option 2" },
                { value: "option3", label: "Option 3" },
              ]}
              placeholder="Choose an option..."
            />
          </FormField>

          <FormField label="Textarea">
            <Textarea placeholder="Enter a longer message..." />
          </FormField>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
        </CardContent>
      </Card>

      {/* Loading States */}
      <Card>
        <CardHeader>
          <CardTitle>Loading States</CardTitle>
          <CardDescription>Spinners and skeleton loaders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Spinner size="sm" />
            <Spinner size="default" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
          <CardDescription>Alert components for different message types</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle>Info</AlertTitle>
            <AlertDescription>
              This is an informational alert message.
            </AlertDescription>
          </Alert>

          <Alert variant="success">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>
              This is a success alert message.
            </AlertDescription>
          </Alert>

          <Alert variant="warning">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              This is a warning alert message.
            </AlertDescription>
          </Alert>

          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              This is an error alert message.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Toasts */}
      <Card>
        <CardHeader>
          <CardTitle>Toast Notifications</CardTitle>
          <CardDescription>Toast notifications for user feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => handleToast("default")}>Default Toast</Button>
            <Button onClick={() => handleToast("success")}>Success Toast</Button>
            <Button onClick={() => handleToast("warning")}>Warning Toast</Button>
            <Button onClick={() => handleToast("destructive")}>Error Toast</Button>
          </div>
        </CardContent>
      </Card>

      {/* Badges and Avatars */}
      <Card>
        <CardHeader>
          <CardTitle>Badges & Avatars</CardTitle>
          <CardDescription>Status badges and user avatars</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
          </div>

          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RefreshCw, Smartphone, User, Calendar, AlertCircle, LogOut, QrCode, X, Settings, Menu, Building2, Phone, Mail, Globe, CheckCircle, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

export default function AdminDashboard() {
  // Authentication states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Existing states
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logoutLoading, setLogoutLoading] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [qrLoading, setQrLoading] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [currentInstanceId, setCurrentInstanceId] = useState(null);
  
  // Connection monitoring states
  const [connectingInstance, setConnectingInstance] = useState(null);
  const [showConnectingModal, setShowConnectingModal] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState('Waiting for scan...');
  
  // New states for sidebar and settings
  const [activeTab, setActiveTab] = useState('instances');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [settingsError, setSettingsError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Initialize form data with default values to prevent controlled/uncontrolled input issues
  const [formData, setFormData] = useState({
    businessName: '',
    businessAddress: '',
    businessPhone: '',
    businessEmail: '',
    businessWebsite: '',
    whatsappNumber: '',
    whatsappInstanceId: '',
    emailHost: '',
    emailPort: '',
    emailUser: '',
    emailPassword: '',
    emailFrom: '',
    notifyOnNewBooking: false,
    autoReplyEnabled: false,
    autoReplyMessage: ''
  });
  
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  // Refs for intervals
  const statusCheckInterval = useRef(null);
  const connectionCheckInterval = useRef(null);

  // Authentication check function
  const checkAuthentication = async () => {
    setAuthLoading(true);
    
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Test token validity by making a simple API call
      const response = await fetch('https://wwtravels.net/api/instances/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      // Token is valid, user is authenticated
      setIsAuthenticated(true);
      
    } catch (error) {
      console.error('Authentication check failed:', error);
      
      // Clear invalid token
      Cookies.remove('authToken');
      
      // Redirect to home page
      window.location.href = '/';
      return;
      
    } finally {
      setAuthLoading(false);
    }
  };

  // Check authentication on component mount
  useEffect(() => {
    checkAuthentication();
  }, []);

  const fetchInstances = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://wwtravels.net/api/instances/all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Unauthorized - redirect to home
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to fetch instances');
      }

      if (data.status && data.instances) {
        setInstances(data.instances);
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message || 'An error occurred while fetching instances');
      
      if (error.message.includes('authentication') || error.message.includes('401')) {
        Cookies.remove('authToken');
        window.location.href = '/';
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchSettings = async () => {
    setSettingsLoading(true);
    setSettingsError('');
    
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://wwtravels.net/api/settings/get', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Unauthorized - redirect to home
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to fetch settings');
      }

      if (data.success && data.settings) {
        const settingsData = data.settings;
        setSettings(settingsData);
        
        // Update form data with fetched settings, ensuring all fields have default values
        setFormData({
          businessName: settingsData.businessName || '',
          businessAddress: settingsData.businessAddress || '',
          businessPhone: settingsData.businessPhone || '',
          businessEmail: settingsData.businessEmail || '',
          businessWebsite: settingsData.businessWebsite || '',
          whatsappNumber: settingsData.whatsappNumber || '',
          whatsappInstanceId: settingsData.whatsappInstanceId || '',
          emailHost: settingsData.emailHost || '',
          emailPort: settingsData.emailPort || '',
          emailUser: settingsData.emailUser || '',
          emailPassword: settingsData.emailPassword || '',
          emailFrom: settingsData.emailFrom || '',
          notifyOnNewBooking: settingsData.notifyOnNewBooking || false,
          autoReplyEnabled: settingsData.autoReplyEnabled || false,
          autoReplyMessage: settingsData.autoReplyMessage || ''
        });
      } else {
        throw new Error('Invalid response format');
      }
      
    } catch (error) {
      console.error('Settings fetch error:', error);
      setSettingsError(error.message || 'An error occurred while fetching settings');
      
      if (error.message.includes('authentication') || error.message.includes('401')) {
        Cookies.remove('authToken');
        window.location.href = '/';
      }
    } finally {
      setSettingsLoading(false);
    }
  };

  const handleLogout = async (instanceId) => {
    setLogoutLoading(instanceId);
    
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://wwtravels.net/api/instances/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          instanceId: instanceId
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Unauthorized - redirect to home
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to logout instance');
      }

      await fetchQrCode(instanceId);
      await fetchInstances();
      
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message || 'An error occurred during logout');
      
      if (error.message.includes('authentication') || error.message.includes('401')) {
        Cookies.remove('authToken');
        window.location.href = '/';
      }
    } finally {
      setLogoutLoading(null);
    }
  };

  const fetchQrCode = async (instanceId) => {
    setQrLoading(true);
    setCurrentInstanceId(instanceId);
    
    try {
      const token = Cookies.get('authToken');
      
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://wwtravels.net/api/instances/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          instance_id: instanceId
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Unauthorized - redirect to home
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to fetch QR code');
      }

      if (data.qr) {
        setQrCode(data.qr);
        setShowQrModal(true);
        // Start monitoring connection
        startConnectionMonitoring(instanceId);
      } else {
        throw new Error('No QR code received');
      }
      
    } catch (error) {
      console.error('QR fetch error:', error);
      setError(error.message || 'An error occurred while fetching QR code');
      
      if (error.message.includes('authentication') || error.message.includes('401')) {
        Cookies.remove('authToken');
        window.location.href = '/';
      }
    } finally {
      setQrLoading(false);
    }
  };

  const startConnectionMonitoring = (instanceId) => {
    setConnectingInstance(instanceId);
    setConnectionProgress('Waiting for scan...');
    
    // Clear any existing interval
    if (connectionCheckInterval.current) {
      clearInterval(connectionCheckInterval.current);
    }
    
    // Check connection status every 3 seconds
    connectionCheckInterval.current = setInterval(async () => {
      try {
        const token = Cookies.get('authToken');
        if (!token) {
          window.location.href = '/';
          return;
        }

        const response = await fetch('https://wwtravels.net/api/instances/all', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }

        const data = await response.json();
        if (data.status && data.instances) {
          const instance = data.instances.find(inst => inst._id === instanceId);
          
          if (instance?.whatsapp?.status === 'connected') {
            // Connection successful!
            setConnectionProgress('Connected successfully!');
            setShowQrModal(false);
            setShowConnectingModal(true);
            
            // Update instances
            setInstances(data.instances);
            
            // Clear the monitoring
            clearInterval(connectionCheckInterval.current);
            setConnectingInstance(null);
            
            // Auto-close success modal after 3 seconds
            setTimeout(() => {
              setShowConnectingModal(false);
            }, 3000);
          } else if (instance?.whatsapp?.status === 'connecting') {
            setConnectionProgress('Authenticating...');
          }
        }
      } catch (error) {
        console.error('Connection monitoring error:', error);
      }
    }, 3000);
  };

  const closeQrModal = () => {
    setShowQrModal(false);
    setQrCode(null);
    setCurrentInstanceId(null);
    
    // Clear connection monitoring
    if (connectionCheckInterval.current) {
      clearInterval(connectionCheckInterval.current);
    }
    setConnectingInstance(null);
  };

  // Handle admin logout
  const handleAdminLogout = () => {
    Cookies.remove('authToken');
    window.location.href = '/';
  };

  // Fetch instances when switching to the instances tab
  useEffect(() => {
    if (isAuthenticated && activeTab === 'instances') {
      fetchInstances();
    }
  }, [activeTab, isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && activeTab === 'settings' && !settings) {
      fetchSettings();
    }
  }, [activeTab, settings, isAuthenticated]);

  // Handle cleanup and auth token removal
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Remove token when page is being unloaded
      Cookies.remove('authToken');
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        // Remove token when page is hidden (tab switched, browser minimized, etc.)
        Cookies.remove('authToken');
      }
    };

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      // Clear intervals
      if (statusCheckInterval.current) {
        clearInterval(statusCheckInterval.current);
      }
      if (connectionCheckInterval.current) {
        clearInterval(connectionCheckInterval.current);
      }
      
      // Remove event listeners
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      
      // Remove token when component unmounts
      Cookies.remove('authToken');
    };
  }, []);

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <Shield className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
          <h2 className="text-xl font-semibold text-gray-900">Verifying Authentication</h2>
          <p className="text-gray-600">Please wait while we verify your access...</p>
          <div className="flex items-center justify-center space-x-2">
            <RefreshCw className="h-5 w-5 animate-spin text-blue-600" />
            <span className="text-sm text-gray-500">Checking credentials...</span>
          </div>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render the dashboard (redirect will happen)
  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPhone = (phone) => {
    if (!phone) return 'N/A';
    return phone.replace(/(\d{2})(\d{4})(\d{6})/, '+$1 $2-$3');
  };

  const sidebarItems = [
    { id: 'instances', label: 'WhatsApp Instances', icon: Smartphone },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderInstances = () => {
    if (loading) {
      return (
        <div className="space-y-6">
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-72">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                WhatsApp Instances
              </h1>
              <p className="mt-2 text-gray-600">
                Manage and monitor your WhatsApp business instances
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <Badge variant="outline" className="px-3 py-1">
                Total: {instances.length}
              </Badge>
              <Button 
                onClick={fetchInstances} 
                disabled={loading}
                size="sm"
                className="flex items-center space-x-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Instances Grid */}
        {instances.length === 0 && !loading && !error ? (
          <div className="text-center py-12">
            <Smartphone className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No instances found</h3>
            <p className="text-gray-600">No WhatsApp instances are currently available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {instances.map((instance) => (
              <Card 
                key={instance._id} 
                className="hover:shadow-lg transition-all duration-200 border-0 shadow-md hover:scale-[1.02]"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      {instance.whatsapp?.profile ? (
                        <Image
                          src={instance.whatsapp.profile}
                          alt={instance.whatsapp?.name || 'Profile'}
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/48/48';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-400" />
                        </div>
                      )}
                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        instance.whatsapp?.status === 'connected' ? 'bg-green-500' : 
                        instance.whatsapp?.status === 'connecting' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                      {connectingInstance === instance._id && (
                        <div className="absolute -top-1 -right-1">
                          <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg font-semibold text-gray-900 truncate">
                        {instance.whatsapp?.name || 'Unknown'}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500">
                        {formatPhone(instance.whatsapp?.phone)}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <Badge 
                      className={`${getStatusColor(instance.whatsapp?.status)} border font-medium`}
                      variant="outline"
                    >
                      {instance.whatsapp?.status === 'connecting' && connectingInstance === instance._id ? 
                        'Connecting...' : 
                        instance.whatsapp?.status || 'Unknown'
                      }
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    {instance.whatsapp?.status === 'connected' ? (
                      <Button
                        onClick={() => handleLogout(instance._id)}
                        disabled={logoutLoading === instance._id}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-red-600 border-red-200 hover:bg-red-50"
                      >
                        {logoutLoading === instance._id ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <LogOut className="h-3 w-3" />
                        )}
                        <span>Logout</span>
                      </Button>
                    ) : (
                      <Button
                        onClick={() => fetchQrCode(instance._id)}
                        disabled={qrLoading && currentInstanceId === instance._id}
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-1 text-blue-600 border-blue-200 hover:bg-blue-50"
                      >
                        {qrLoading && currentInstanceId === instance._id ? (
                          <RefreshCw className="h-3 w-3 animate-spin" />
                        ) : (
                          <QrCode className="h-3 w-3" />
                        )}
                        <span>QR Code</span>
                      </Button>
                    )}
                  </div>

                  {/* Bio */}
                  {instance.whatsapp?.bio && (
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-1">Bio</span>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded border">
                        {instance.whatsapp.bio}
                      </p>
                    </div>
                  )}

                  {/* Instance ID */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs font-mono text-gray-400 break-all">
                      ID: {instance._id}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {instances.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Instance Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {instances.filter(i => i.whatsapp?.status === 'connected').length}
                </div>
                <div className="text-sm text-gray-600">Connected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {instances.filter(i => i.whatsapp?.status !== 'connected').length}
                </div>
                <div className="text-sm text-gray-600">Disconnected</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {instances.length}
                </div>
                <div className="text-sm text-gray-600">Total Instances</div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSaveSettings = async () => {
    setUpdateLoading(true);
    setUpdateError('');
    setUpdateSuccess(false);
    
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please login again.');
      }

      const response = await fetch('https://wwtravels.net/api/settings/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          // Unauthorized - redirect to home
          Cookies.remove('authToken');
          window.location.href = '/';
          return;
        }
        throw new Error(data.message || 'Failed to update settings');
      }

      if (data.success) {
        setSettings(prev => ({
          ...prev,
          ...formData
        }));
        setIsEditing(false);
        setUpdateSuccess(true);
        
        // Hide success message after 3 seconds
        setTimeout(() => setUpdateSuccess(false), 3000);
      } else {
        throw new Error('Failed to update settings');
      }
    } catch (error) {
      console.error('Update error:', error);
      setUpdateError(error.message || 'An error occurred while updating settings');
    } finally {
      setUpdateLoading(false);
    }
  };

  const resetFormData = () => {
    if (settings) {
      setFormData({
        businessName: settings.businessName || '',
        businessAddress: settings.businessAddress || '',
        businessPhone: settings.businessPhone || '',
        businessEmail: settings.businessEmail || '',
        businessWebsite: settings.businessWebsite || '',
        whatsappNumber: settings.whatsappNumber || '',
        whatsappInstanceId: settings.whatsappInstanceId || '',
        emailHost: settings.emailHost || '',
        emailPort: settings.emailPort || '',
        emailUser: settings.emailUser || '',
        emailPassword: settings.emailPassword || '',
        emailFrom: settings.emailFrom || '',
        notifyOnNewBooking: settings.notifyOnNewBooking || false,
        autoReplyEnabled: settings.autoReplyEnabled || false,
        autoReplyMessage: settings.autoReplyMessage || ''
      });
    }
  };

  const renderSettings = () => {
    if (settingsLoading) {
      return (
        <div className="space-y-6">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-64">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Settings
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your application settings and configurations
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {!isEditing ? (
                <>
                  <Button 
                    onClick={fetchSettings} 
                    disabled={settingsLoading}
                    size="sm"
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <RefreshCw className={`h-4 w-4 ${settingsLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </Button>
                  <Button 
                    onClick={() => setIsEditing(true)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Edit Settings
                  </Button>
                </>
              ) : (
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveSettings}
                    size="sm"
                    disabled={updateLoading}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {updateLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsEditing(false);
                      setUpdateError('');
                      resetFormData();
                    }}
                    size="sm"
                    variant="outline"
                    disabled={updateLoading}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Success Alert */}
        {updateSuccess && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              Settings updated successfully!
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alerts */}
        {updateError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {updateError}
            </AlertDescription>
          </Alert>
        )}
        {settingsError && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              {settingsError}
            </AlertDescription>
          </Alert>
        )}

        {/* Settings Grid */}
        {settings ? (
          <div className="grid grid-cols-1 gap-6">
            {/* Business Information */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Building2 className="h-6 w-6 text-blue-600" />
                  <span>Business Information</span>
                </CardTitle>
                <CardDescription>
                  Your business details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Name *</Label>
                    <Input 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter business name"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Phone</Label>
                    <Input 
                      name="businessPhone"
                      value={formData.businessPhone}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter business phone"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Business Email</Label>
                    <Input 
                      name="businessEmail"
                      type="email"
                      value={formData.businessEmail}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter business email"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Website</Label>
                    <Input 
                      name="businessWebsite"
                      type="url"
                      value={formData.businessWebsite}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter website URL"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">Business Address</Label>
                  <Textarea 
                    name="businessAddress"
                    value={formData.businessAddress}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    placeholder="Enter business address"
                    className={`mt-2 min-h-[80px] ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                  />
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp Configuration */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Smartphone className="h-6 w-6 text-green-600" />
                  <span>WhatsApp Configuration</span>
                </CardTitle>
                <CardDescription>
                  WhatsApp instance and automation settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">WhatsApp Number</Label>
                    <Input 
                      name="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter WhatsApp number"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Instance ID</Label>
                    <Input 
                      name="whatsappInstanceId"
                      value={formData.whatsappInstanceId}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Enter instance ID"
                      className={`mt-2 font-mono text-sm ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">
                        New Booking Notifications
                      </Label>
                      <p className="text-xs text-gray-500">
                        Get WhatsApp notifications when new bookings are made
                      </p>
                    </div>
                    <Switch 
                      checked={formData.notifyOnNewBooking}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, notifyOnNewBooking: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium text-gray-700">
                        Auto Reply
                      </Label>
                      <p className="text-xs text-gray-500">
                        Automatically reply to WhatsApp messages
                      </p>
                    </div>
                    <Switch 
                      checked={formData.autoReplyEnabled}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, autoReplyEnabled: checked }))
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {formData.autoReplyEnabled && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Auto Reply Message</Label>
                      <Textarea 
                        name="autoReplyMessage"
                        value={formData.autoReplyMessage}
                        onChange={handleInputChange}
                        readOnly={!isEditing}
                        placeholder="Enter auto reply message"
                        className={`mt-2 min-h-[80px] ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Email Configuration */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-xl">
                  <Mail className="h-6 w-6 text-red-600" />
                  <span>Email Configuration</span>
                </CardTitle>
                <CardDescription>
                  SMTP settings for email notifications and communications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700">SMTP Host</Label>
                    <Input 
                      name="emailHost"
                      value={formData.emailHost}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="smtp.gmail.com"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">SMTP Port</Label>
                    <Input 
                      name="emailPort"
                      type="number"
                      value={formData.emailPort}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="587"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Username</Label>
                    <Input 
                      name="emailUser"
                      value={formData.emailUser}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="your-email@gmail.com"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700">Email Password</Label>
                    <Input 
                      name="emailPassword"
                      type={isEditing ? 'password' : 'password'}
                      value={formData.emailPassword}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="Your app password"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-sm font-medium text-gray-700">From Email Address</Label>
                    <Input 
                      name="emailFrom"
                      type="email"
                      value={formData.emailFrom}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      placeholder="noreply@yourbusiness.com"
                      className={`mt-2 ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-gray-200'}`}
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-blue-900 mb-2">Email Configuration Tips</h4>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>• For Gmail: Use App Password instead of regular password</li>
                      <li>• For Gmail: Host is smtp.gmail.com, Port is 587</li>
                      <li>• Make sure to enable "Less secure app access" or use App Password</li>
                      <li>• Test your configuration after saving</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : !settingsLoading && !settingsError ? (
          <div className="text-center py-12">
            <Settings className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No settings found</h3>
            <p className="text-gray-600">Unable to load system settings.</p>
            <Button 
              onClick={fetchSettings}
              className="mt-4"
              variant="outline"
            >
              Try Again
            </Button>
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 bg-blue-600 px-4">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          {/* Logout Button */}
          <Button
            onClick={handleAdminLogout}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-blue-700"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
        
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Admin Panel</h1>
          <Button
            onClick={handleAdminLogout}
            size="sm"
            variant="ghost"
            className="text-gray-500 hover:text-gray-600"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {activeTab === 'instances' && renderInstances()}
              {activeTab === 'settings' && renderSettings()}
            </div>
          </div>
        </main>
      </div>

      {/* QR Code Modal */}
      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <QrCode className="h-5 w-5 text-blue-600" />
              <span>WhatsApp QR Code</span>
            </DialogTitle>
            <DialogDescription>
              Scan this QR code with your WhatsApp mobile app to connect this instance.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4 py-4">
            {qrLoading ? (
              <div className="flex flex-col items-center space-y-4">
                <RefreshCw className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-gray-500">Loading QR code...</p>
              </div>
            ) : qrCode ? (
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
                <Image
                  src={qrCode}
                  alt="WhatsApp QR Code"
                  width={256}
                  height={256}
                  className="w-64 h-64 object-contain"
                  onError={() => setError('Failed to load QR code image')}
                />
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm">Failed to load QR code</p>
              </div>
            )}

            {connectingInstance && (
              <div className="flex items-center space-x-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>{connectionProgress}</span>
              </div>
            )}
            
            <div className="flex space-x-2">
              <Button
                onClick={() => fetchQrCode(currentInstanceId)}
                disabled={qrLoading}
                variant="outline"
                size="sm"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${qrLoading ? 'animate-spin' : ''}`} />
                Refresh QR
              </Button>
              <Button
                onClick={closeQrModal}
                variant="outline"
                size="sm"
              >
                <X className="h-4 w-4 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Connection Success Modal */}
      <Dialog open={showConnectingModal} onOpenChange={setShowConnectingModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Connection Successful!</span>
            </DialogTitle>
            <DialogDescription>
              Your WhatsApp instance has been connected successfully.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center space-y-4 py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center text-gray-600">
              The instance is now ready to send and receive messages.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
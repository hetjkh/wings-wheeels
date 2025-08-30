'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Cookies from 'js-cookie';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { RefreshCw, Smartphone, User, Calendar, AlertCircle, LogOut, QrCode, X, Settings, Menu, Building2, Phone, Mail, Globe, CheckCircle, Clock, Shield, Tag } from 'lucide-react';
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
  
  // State for offers
  const [offers, setOffers] = useState([]);
  const [offersLoading, setOffersLoading] = useState(false);
  const [offersError, setOffersError] = useState('');
  
  // State for new offer form
  const [newOffer, setNewOffer] = useState({
    name: '',
    price: '',
    alt: '',
    image: null
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs for intervals
  const statusCheckInterval = useRef(null);
  const connectionCheckInterval = useRef(null);

  // Effects and callbacks
  useEffect(() => {
    checkAuthentication();
    return () => {
      // Cleanup intervals
      if (statusCheckInterval.current) clearInterval(statusCheckInterval.current);
      if (connectionCheckInterval.current) clearInterval(connectionCheckInterval.current);
    };
  }, []);

  // Load settings when settings tab is active
  useEffect(() => {
    if (activeTab === 'settings' && !settings && !settingsLoading) {
      fetchSettings();
    }
  }, [activeTab, settings, settingsLoading]);

  // Fetch offers from API
  const fetchOffers = useCallback(async () => {
    setOffersLoading(true);
    setOffersError('');
    const token = Cookies.get('authToken');
    
    try {
      const response = await fetch('https://wwtravels.net/api/offers/all', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch offers');
      }
      
      const data = await response.json();
      setOffers(data.offers || []);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffersError('Failed to load offers. Please try again.');
    } finally {
      setOffersLoading(false);
    }
  }, []);

  // Load offers when offers tab is active
  useEffect(() => {
    if (activeTab === 'offers') {
      fetchOffers();
    }
  }, [activeTab, fetchOffers]);

  // Handle input change for offer form
  const handleOfferChange = (e, isEdit = false) => {
    const { name, value, files } = e.target;
    
    if (isEdit) {
      setEditingOffer(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || '' : value,
        // Keep the existing image if not changed
        ...(name === 'image' && { image: files[0], imageChanged: true })
      }));
    } else {
      setNewOffer(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) || '' : value,
        ...(name === 'image' && { image: files[0] })
      }));
    }
  };

  // Handle edit button click
  const handleEditClick = (offer) => {
    setEditingOffer({
      ...offer,
      image: null,
      imageChanged: false
    });
    setIsEditModalOpen(true);
  };

  // Handle update offer
  const handleUpdateOffer = async (e) => {
    e.preventDefault();
    
    if (!editingOffer.name || !editingOffer.price) {
      setOffersError('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setOffersError('');
    
    const token = Cookies.get('authToken');
    const formData = new FormData();
    
    // Append all form data
    formData.append('id', editingOffer._id);
    formData.append('name', editingOffer.name);
    formData.append('price', editingOffer.price);
    formData.append('alt', editingOffer.alt || 'Offer image');
    
    // Only append image if it was changed
    if (editingOffer.imageChanged && editingOffer.image) {
      formData.append('image', editingOffer.image);
    }
    
    try {
      const response = await fetch('https://wwtravels.net/api/offers/update', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update offer');
      }
      
      const data = await response.json();
      
      // Update the offer in the list
      setOffers(prev => prev.map(offer => 
        offer._id === data.offer._id ? data.offer : offer
      ));
      
      // Close modal and reset form
      setIsEditModalOpen(false);
      setEditingOffer(null);
      
    } catch (error) {
      console.error('Error updating offer:', error);
      setOffersError(error.message || 'Failed to update offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle delete offer
  const handleDeleteOffer = async (id) => {
    if (!confirm('Are you sure you want to delete this offer? This action cannot be undone.')) {
      return;
    }

    const token = Cookies.get('authToken');
    
    try {
      const response = await fetch('https://wwtravels.net/api/offers/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ id })
      });

      if (!response.ok) {
        throw new Error('Failed to delete offer');
      }

      // Remove the deleted offer from the state
      setOffers(prev => prev.filter(offer => offer._id !== id));
      
    } catch (error) {
      console.error('Error deleting offer:', error);
      setOffersError(error.message || 'Failed to delete offer. Please try again.');
    }
  };

  // Handle form submission for creating a new offer
  const handleCreateOffer = async (e) => {
    e.preventDefault();
    
    if (!newOffer.name || !newOffer.price || !newOffer.image) {
      setOffersError('Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    setOffersError('');
    
    const token = Cookies.get('authToken');
    const formData = new FormData();
    
    // Append all form data
    formData.append('name', newOffer.name);
    formData.append('price', newOffer.price);
    formData.append('alt', newOffer.alt || 'Offer image');
    formData.append('image', newOffer.image);
    
    try {
      const response = await fetch('https://wwtravels.net/api/offers/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create offer');
      }
      
      const data = await response.json();
      
      // Add new offer to the list and close modal
      setOffers(prev => [data.offer, ...prev]);
      setNewOffer({
        name: '',
        price: '',
        alt: '',
        image: null
      });
      setIsCreateModalOpen(false);
      
    } catch (error) {
      console.error('Error creating offer:', error);
      setOffersError(error.message || 'Failed to create offer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper functions (moved after all hooks)
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



  const sidebarItems = [
    { id: 'instances', label: 'WhatsApp Instances', icon: Smartphone },
    { id: 'offers', label: 'Offers', icon: Tag },
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

  const renderOffers = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Special Offers
            </h1>
            <p className="mt-2 text-gray-600">
              Manage your special offers and promotions
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 sm:mt-0"
          >
            Create New Offer
          </Button>
        </div>

        {offersError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{offersError}</AlertDescription>
          </Alert>
        )}

        {/* Create Offer Modal */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-xl">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-semibold text-gray-900">Create New Offer</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Fill in the details below to create a new special offer.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleCreateOffer} className="px-6 py-4 space-y-6">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Offer Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={newOffer.name}
                  onChange={(e) => handleOfferChange(e, false)}
                  placeholder="e.g., Summer Special"
                  className="mt-1.5 py-2 px-3 text-base"
                  required
                />
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Price (₹) <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">AED</span>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={newOffer.price}
                    onChange={(e) => handleOfferChange(e, false)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="mt-1.5 py-2 pl-16 pr-3 text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="alt" className="text-sm font-medium text-gray-700">
                  Image Description (Alt Text)
                </Label>
                <Input
                  id="alt"
                  name="alt"
                  value={newOffer.alt}
                  onChange={(e) => handleOfferChange(e, false)}
                  placeholder="Describe the image for accessibility"
                  className="mt-1.5 py-2 px-3 text-base"
                />
                <p className="mt-1 text-xs text-gray-500">
                  This helps with accessibility and SEO.
                </p>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="image" className="text-sm font-medium text-gray-700">
                  Offer Image <span className="text-red-500">*</span>
                </Label>
                <div className="mt-1.5 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleOfferChange(e, false)}
                          className="sr-only"
                          required
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
                {newOffer.image && (
                  <p className="mt-1 text-sm text-green-600">
                    ✓ {newOffer.image.name} selected
                  </p>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create Offer'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        {/* Edit Offer Modal */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[500px] bg-white rounded-lg shadow-xl">
            <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100">
              <DialogTitle className="text-xl font-semibold text-gray-900">Edit Offer</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Update the details of this offer.
              </DialogDescription>
            </DialogHeader>
            {editingOffer && (
              <form onSubmit={handleUpdateOffer} className="px-6 py-4 space-y-6">
                <div className="space-y-1.5">
                  <Label htmlFor="edit-name" className="text-sm font-medium text-gray-700">
                    Offer Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="edit-name"
                    name="name"
                    value={editingOffer.name || ''}
                    onChange={(e) => handleOfferChange(e, true)}
                    placeholder="e.g., Summer Special"
                    className="mt-1.5 py-2 px-3 text-base"
                    required
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="edit-price" className="text-sm font-medium text-gray-700">
                    Price (AED) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">AED</span>
                    <Input
                      id="edit-price"
                      name="price"
                      type="number"
                      value={editingOffer.price || ''}
                      onChange={(e) => handleOfferChange(e, true)}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="mt-1.5 py-2 pl-16 pr-3 text-base"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-alt">Image Description (Alt Text)</Label>
                  <Input
                    id="edit-alt"
                    name="alt"
                    value={editingOffer.alt || ''}
                    onChange={(e) => handleOfferChange(e, true)}
                    placeholder="Describe the image for accessibility"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="edit-image">Update Image (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <div className="relative h-16 w-16">
                      <Image
                        src={editingOffer.imageChanged && editingOffer.image ? 
                          URL.createObjectURL(editingOffer.image) : 
                          editingOffer.imageUrl || '/placeholder.svg'}
                        alt={editingOffer.alt || 'Offer image'}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <Input
                        id="edit-image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleOfferChange(e, true)}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to keep current image
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditModalOpen(false);
                      setEditingOffer(null);
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      'Update Offer'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>

        {offersLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-72">
                <CardHeader className="pb-4">
                  <Skeleton className="h-40 w-full rounded-t-lg" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <Tag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No offers available</h3>
            <p className="text-gray-600 mb-4">Create your first offer to get started</p>
            <Button>
              Create Offer
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <Card key={offer._id} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={offer.image}
                    alt={offer.alt || 'Offer image'}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{offer.name}</CardTitle>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline">
                      <span className="text-sm font-medium text-gray-500 mr-1">AED</span>
                      <span className="text-2xl font-bold text-primary">{offer.price}</span>
                    </div>
                    <Badge variant="outline" className="text-sm">
                      {new Date(offer.createdAt).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditClick(offer)}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteOffer(offer._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
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
              {activeTab === 'offers' && renderOffers()}
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
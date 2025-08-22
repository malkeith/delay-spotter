import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, AlertTriangle } from 'lucide-react';

interface DelayReport {
  id: string;
  transportName: string;
  delayTime: number;
  reportTime: string;
  timestamp: number;
}

const DelayTracker = () => {
  const [transportName, setTransportName] = useState('');
  const [delayTime, setDelayTime] = useState('');
  const [reports, setReports] = useState<DelayReport[]>([]);

  // Load reports from localStorage on component mount
  useEffect(() => {
    const savedReports = localStorage.getItem('delayReports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  // Save reports to localStorage whenever reports change
  useEffect(() => {
    localStorage.setItem('delayReports', JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transportName.trim() || !delayTime.trim()) {
      return;
    }

    const delay = parseInt(delayTime);
    if (isNaN(delay) || delay < 0) {
      return;
    }

    const newReport: DelayReport = {
      id: Date.now().toString(),
      transportName: transportName.trim(),
      delayTime: delay,
      reportTime: new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      }),
      timestamp: Date.now()
    };

    setReports(prev => [newReport, ...prev]);
    setTransportName('');
    setDelayTime('');
  };

  const getDelayBadgeVariant = (delay: number) => {
    if (delay === 0) return 'default';
    if (delay <= 5) return 'secondary';
    if (delay <= 15) return 'outline';
    return 'destructive';
  };

  const getDelayIcon = (delay: number) => {
    if (delay === 0) return <Clock className="w-4 h-4 text-transport-success" />;
    if (delay <= 5) return <Clock className="w-4 h-4 text-transport-warning" />;
    return <AlertTriangle className="w-4 h-4 text-transport-danger" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-transport-surface-alt via-background to-transport-surface">
      <div className="container mx-auto p-4 max-w-md">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            🚍 Public Transport Delay Tracker
          </h1>
          <p className="text-muted-foreground">Report and track transport delays in real-time</p>
        </div>

        {/* Report Form */}
        <Card className="mb-6 shadow-lg border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              Report a Delay
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="transport-name" className="text-sm font-medium">
                  Transport Name
                </Label>
                <Input
                  id="transport-name"
                  type="text"
                  placeholder="e.g., Bus 123, Metro Red Line"
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="delay-time" className="text-sm font-medium">
                  Delay Time (minutes)
                </Label>
                <Input
                  id="delay-time"
                  type="number"
                  placeholder="0"
                  min="0"
                  max="999"
                  value={delayTime}
                  onChange={(e) => setDelayTime(e.target.value)}
                  className="w-full"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={!transportName.trim() || !delayTime.trim()}
              >
                Report Delay
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Recent Reports ({reports.length})
          </h2>
          
          {reports.length === 0 ? (
            <Card className="border-0 bg-card/60 backdrop-blur-sm">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">No delays reported yet</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Be the first to report a transport delay!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {reports.map((report) => (
                <Card key={report.id} className="border-0 bg-card/80 backdrop-blur-sm shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getDelayIcon(report.delayTime)}
                          <h3 className="font-semibold text-card-foreground">
                            {report.transportName}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          Reported at {report.reportTime}
                        </div>
                      </div>
                      <Badge 
                        variant={getDelayBadgeVariant(report.delayTime)}
                        className="ml-2"
                      >
                        {report.delayTime === 0 ? 'On Time' : `+${report.delayTime}min`}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DelayTracker;
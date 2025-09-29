import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, 
  Plus, 
  Search, 
  Eye, 
  Edit,
  Calendar,
  User,
  Phone,
  Mail
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import PatientDetailView from "./PatientDetailView";

const PatientManagement = () => {
  const { t } = useLanguage();
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      age: 45,
      gender: "Male",
      dosha: "Vata",
      phone: "+91 98765 43210",
      email: "rajesh.kumar@email.com",
      joinDate: "2024-01-15",
      status: "Active",
      lastVisit: "2024-01-18"
    },
    {
      id: 2,
      name: "Priya Verma",
      age: 32,
      gender: "Female",
      dosha: "Pitta",
      phone: "+91 87654 32109",
      email: "priya.verma@email.com",
      joinDate: "2024-01-10",
      status: "Following Plan",
      lastVisit: "2024-01-16"
    },
    {
      id: 3,
      name: "Amit Singh",
      age: 38,
      gender: "Male",
      dosha: "Kapha",
      phone: "+91 76543 21098",
      email: "amit.singh@email.com",
      joinDate: "2024-01-08",
      status: "Review Needed",
      lastVisit: "2024-01-12"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    gender: "",
    dosha: "",
    phone: "",
    email: "",
    foodHabits: "",
    waterIntake: "",
    bowelMovement: "",
    healthConcerns: ""
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.dosha.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPatient = () => {
    if (newPatient.name && newPatient.age && newPatient.dosha) {
      const patient = {
        id: patients.length + 1,
        name: newPatient.name,
        age: parseInt(newPatient.age),
        gender: newPatient.gender,
        dosha: newPatient.dosha,
        phone: newPatient.phone,
        email: newPatient.email,
        joinDate: new Date().toISOString().split('T')[0],
        status: "Active",
        lastVisit: new Date().toISOString().split('T')[0]
      };
      
      setPatients([...patients, patient]);
      setNewPatient({
        name: "",
        age: "",
        gender: "",
        dosha: "",
        phone: "",
        email: "",
        foodHabits: "",
        waterIntake: "",
        bowelMovement: "",
        healthConcerns: ""
      });
      setIsAddingPatient(false);
    }
  };

  const handleViewPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsEditing(false);
  };

  const handleEditPatient = (patient: any) => {
    setSelectedPatient(patient);
    setIsEditing(true);
  };

  const handleSavePatient = (updatedPatient: any) => {
    setPatients(patients.map(p => p.id === updatedPatient.id ? updatedPatient : p));
    setSelectedPatient(null);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('patients.title')}</h1>
          <p className="text-muted-foreground">{t('patients.subtitle')}</p>
        </div>
        <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-healing shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              {t('patients.addPatient')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Patient</DialogTitle>
              <DialogDescription>
                Create a comprehensive Ayurvedic profile for your new patient
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={newPatient.name}
                  onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                  placeholder="Enter patient name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={newPatient.age}
                  onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
                  placeholder="Age in years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({ ...newPatient, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dosha">Primary Dosha *</Label>
                <Select value={newPatient.dosha} onValueChange={(value) => setNewPatient({ ...newPatient, dosha: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select primary dosha" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vata">Vata (Air & Space)</SelectItem>
                    <SelectItem value="Pitta">Pitta (Fire & Water)</SelectItem>
                    <SelectItem value="Kapha">Kapha (Earth & Water)</SelectItem>
                    <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                    <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                    <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={newPatient.phone}
                  onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                  placeholder="+91 99999 99999"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newPatient.email}
                  onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                  placeholder="patient@example.com"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="foodHabits">Food Habits & Preferences</Label>
                <Textarea
                  id="foodHabits"
                  value={newPatient.foodHabits}
                  onChange={(e) => setNewPatient({ ...newPatient, foodHabits: e.target.value })}
                  placeholder="Vegetarian, allergies, preferences, current diet..."
                  className="h-20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waterIntake">Daily Water Intake</Label>
                <Input
                  id="waterIntake"
                  value={newPatient.waterIntake}
                  onChange={(e) => setNewPatient({ ...newPatient, waterIntake: e.target.value })}
                  placeholder="e.g., 2-3 liters"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bowelMovement">Bowel Movement Pattern</Label>
                <Input
                  id="bowelMovement"
                  value={newPatient.bowelMovement}
                  onChange={(e) => setNewPatient({ ...newPatient, bowelMovement: e.target.value })}
                  placeholder="e.g., Once daily, regular"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="healthConcerns">Health Concerns & Goals</Label>
                <Textarea
                  id="healthConcerns"
                  value={newPatient.healthConcerns}
                  onChange={(e) => setNewPatient({ ...newPatient, healthConcerns: e.target.value })}
                  placeholder="Current health issues, wellness goals, medical history..."
                  className="h-20"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddingPatient(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPatient} className="bg-gradient-healing">
                Add Patient
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search patients by name or dosha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Total: {patients.length}</span>
          <span>Active: {patients.filter(p => p.status === "Active").length}</span>
        </div>
      </div>

      {/* Patient Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} className="shadow-card border-0 bg-card/50 backdrop-blur hover:shadow-glow transition-all">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-healing rounded-full flex items-center justify-center">
                    <span className="text-primary-foreground font-medium">
                      {patient.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{patient.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} years • {patient.gender}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {patient.dosha}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {patient.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {patient.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Last visit: {patient.lastVisit}
              </div>
              <div className="flex items-center justify-between pt-2">
                <Badge 
                  variant={patient.status === "Active" ? "default" : 
                          patient.status === "Following Plan" ? "secondary" : "outline"}
                >
                  {patient.status}
                </Badge>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleViewPatient(patient)}
                    className="hover-scale"
                    title={t('patient.viewInfo')}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditPatient(patient)}
                    className="hover-scale"
                    title={t('patient.editInfo')}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card className="shadow-card border-0 bg-card/50 backdrop-blur text-center py-12">
          <CardContent>
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <CardTitle className="text-lg mb-2">No Patients Found</CardTitle>
            <CardDescription>
              {searchTerm ? "Try adjusting your search terms" : "Start by adding your first patient"}
            </CardDescription>
          </CardContent>
        </Card>
      )}

      {/* Patient Detail View Modal */}
      {selectedPatient && (
        <PatientDetailView
          patient={selectedPatient}
          onClose={handleCloseDetail}
          onSave={handleSavePatient}
          isEditing={isEditing}
        />
      )}
    </div>
  );
};

export default PatientManagement;
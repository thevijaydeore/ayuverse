import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  Heart, 
  Edit, 
  Save, 
  X,
  Leaf,
  Flame,
  Droplets
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: string;
  dosha: string;
  phone: string;
  email: string;
  joinDate: string;
  status: string;
  lastVisit: string;
  foodHabits?: string;
  waterIntake?: string;
  bowelMovement?: string;
  healthConcerns?: string;
}

interface PatientDetailViewProps {
  patient: Patient;
  onClose: () => void;
  onSave: (updatedPatient: Patient) => void;
  isEditing?: boolean;
}

const PatientDetailView = ({ patient, onClose, onSave, isEditing = false }: PatientDetailViewProps) => {
  const { t } = useLanguage();
  const [editMode, setEditMode] = useState(isEditing);
  const [editedPatient, setEditedPatient] = useState<Patient>(patient);

  const handleSave = () => {
    onSave(editedPatient);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedPatient(patient);
    setEditMode(false);
  };

  const getDoshaIcon = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata':
        return <Leaf className="w-5 h-5 text-success" />;
      case 'pitta':
        return <Flame className="w-5 h-5 text-destructive" />;
      case 'kapha':
        return <Droplets className="w-5 h-5 text-primary" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getDoshaColor = (dosha: string) => {
    switch (dosha.toLowerCase()) {
      case 'vata':
        return 'text-success border-success/20 bg-success/10';
      case 'pitta':
        return 'text-destructive border-destructive/20 bg-destructive/10';
      case 'kapha':
        return 'text-primary border-primary/20 bg-primary/10';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-glow border-0 bg-card/95 backdrop-blur animate-scale-in">
        <CardHeader className="border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-healing rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">
                  {patient.name.charAt(0)}
                </span>
              </div>
              <div>
                <CardTitle className="text-2xl">{t('patient.patientDetails')}</CardTitle>
                <CardDescription className="text-lg font-medium text-foreground mt-1">
                  {patient.name}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!editMode ? (
                <Button
                  variant="outline"
                  onClick={() => setEditMode(true)}
                  className="hover-scale"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {t('patient.editInfo')}
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="hover-scale"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {t('patient.cancel')}
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-healing hover-scale"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {t('patient.saveChanges')}
                  </Button>
                </div>
              )}
              <Button variant="ghost" onClick={onClose} className="hover-scale">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-8">
          {/* Constitutional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {getDoshaIcon(patient.dosha)}
              <h3 className="text-lg font-semibold">{t('patient.constitution')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{t('patients.total')} {t('patient.constitution')}</Label>
                {editMode ? (
                  <Select
                    value={editedPatient.dosha}
                    onValueChange={(value) => setEditedPatient({ ...editedPatient, dosha: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Vata">Vata</SelectItem>
                      <SelectItem value="Pitta">Pitta</SelectItem>
                      <SelectItem value="Kapha">Kapha</SelectItem>
                      <SelectItem value="Vata-Pitta">Vata-Pitta</SelectItem>
                      <SelectItem value="Pitta-Kapha">Pitta-Kapha</SelectItem>
                      <SelectItem value="Vata-Kapha">Vata-Kapha</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-full border ${getDoshaColor(patient.dosha)}`}>
                    {getDoshaIcon(patient.dosha)}
                    <span className="font-medium">{patient.dosha}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                {editMode ? (
                  <Input
                    type="number"
                    value={editedPatient.age}
                    onChange={(e) => setEditedPatient({ ...editedPatient, age: parseInt(e.target.value) })}
                  />
                ) : (
                  <p className="py-2 text-foreground">{patient.age} years</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                {editMode ? (
                  <Select
                    value={editedPatient.gender}
                    onValueChange={(value) => setEditedPatient({ ...editedPatient, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="py-2 text-foreground">{patient.gender}</p>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{t('patient.contactInfo')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                {editMode ? (
                  <Input
                    type="email"
                    value={editedPatient.email}
                    onChange={(e) => setEditedPatient({ ...editedPatient, email: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2 py-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{patient.email}</span>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                {editMode ? (
                  <Input
                    value={editedPatient.phone}
                    onChange={(e) => setEditedPatient({ ...editedPatient, phone: e.target.value })}
                  />
                ) : (
                  <div className="flex items-center gap-2 py-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{patient.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Health Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">{t('patient.healthProfile')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Food Habits</Label>
                {editMode ? (
                  <Textarea
                    value={editedPatient.foodHabits || ''}
                    onChange={(e) => setEditedPatient({ ...editedPatient, foodHabits: e.target.value })}
                    placeholder="Dietary preferences, allergies, etc."
                    className="h-20"
                  />
                ) : (
                  <p className="py-2 text-foreground min-h-[3rem] bg-muted/50 rounded-lg p-3">
                    {patient.foodHabits || 'Not specified'}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Water Intake</Label>
                {editMode ? (
                  <Input
                    value={editedPatient.waterIntake || ''}
                    onChange={(e) => setEditedPatient({ ...editedPatient, waterIntake: e.target.value })}
                    placeholder="Daily water consumption"
                  />
                ) : (
                  <p className="py-2 text-foreground">{patient.waterIntake || 'Not specified'}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Bowel Movement</Label>
                {editMode ? (
                  <Input
                    value={editedPatient.bowelMovement || ''}
                    onChange={(e) => setEditedPatient({ ...editedPatient, bowelMovement: e.target.value })}
                    placeholder="Frequency and pattern"
                  />
                ) : (
                  <p className="py-2 text-foreground">{patient.bowelMovement || 'Not specified'}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Badge 
                  variant={patient.status === "Active" ? "default" : 
                          patient.status === "Following Plan" ? "secondary" : "outline"}
                  className="w-fit"
                >
                  {patient.status}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Health Concerns & Goals</Label>
              {editMode ? (
                <Textarea
                  value={editedPatient.healthConcerns || ''}
                  onChange={(e) => setEditedPatient({ ...editedPatient, healthConcerns: e.target.value })}
                  placeholder="Current health issues, wellness goals..."
                  className="h-24"
                />
              ) : (
                <p className="py-2 text-foreground min-h-[4rem] bg-muted/50 rounded-lg p-3">
                  {patient.healthConcerns || 'Not specified'}
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Visit Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Visit Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Join Date</p>
                <p className="font-medium text-foreground">{patient.joinDate}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Last Visit</p>
                <p className="font-medium text-foreground">{patient.lastVisit}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDetailView;
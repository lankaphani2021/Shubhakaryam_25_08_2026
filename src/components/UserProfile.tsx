import { useState } from "react";
import { User, Phone, MapPin, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface UserProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  place?: string;
}

interface UserProfileProps {
  user: UserProfile;
  onUpdate?: (profile: UserProfile) => void;
}

export const UserProfile = ({ user, onUpdate }: UserProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(user);

  const handleSave = () => {
    onUpdate?.(profile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(user);
    setIsEditing(false);
  };

  const displayName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || profile.email || 'User';

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
          <User className="h-4 w-4" />
        </div>
        <div className="text-sm">
          <div className="font-medium text-foreground">{displayName}</div>
          {!isEditing && (profile.phone || profile.place) && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {profile.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {profile.phone}
                </div>
              )}
              {profile.place && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {profile.place}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-1">
            <Input
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              placeholder="Phone number"
              className="h-7 text-xs"
            />
            <Input
              value={profile.place || ''}
              onChange={(e) => setProfile({ ...profile, place: e.target.value })}
              placeholder="City/Place"
              className="h-7 text-xs"
            />
          </div>
          <Button size="sm" onClick={handleSave} className="h-7 px-2">
            <Check className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel} className="h-7 px-2">
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          className="h-7 px-2"
        >
          <Edit className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default UserProfile;

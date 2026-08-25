import { Link, NavLink, useNavigate } from "react-router-dom";
import { Flame, Menu, X, ChevronDown, Search, User, Phone, MapPin, Calendar, LogOut, UserCircle, Sparkles, Gift } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const serviceLinks = [
  { to: "/services", label: "Poojas", description: "Traditional ceremonies" },
  { to: "/astrology", label: "Astrology", description: "Horoscope & guidance" },
  { to: "/danalu", label: "Navagraha Daan", description: "9 Planet offerings" },
  { to: "/pind-daan", label: "Pind Daan", description: "Ancestral offerings" },
  { to: "/priests", label: "Priests", description: "Verified Vedic priests" },
];

const mainLinks: Array<{ to: string; label: string }> = [
  // My Bookings moved to user dropdown
];

const SiteHeader = () => {
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4">
        
        {/* Left Side - Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
                <Sparkles className="h-3 w-3" />
              </div>
              Services
              <ChevronDown className="h-4 w-4" />
            </button>
            
            {servicesOpen && (
              <div 
                className="absolute left-0 top-full mt-1 w-56 rounded-lg border border-border bg-popover shadow-lg"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="p-2 space-y-1">
                  {serviceLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setServicesOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-md px-3 py-2 text-sm transition-colors ${
                          isActive 
                            ? "bg-accent text-accent-foreground font-medium" 
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        }`
                      }
                    >
                      <div>{link.label}</div>
                      <div className="text-xs opacity-70">{link.description}</div>
                    </NavLink>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Navigation Links */}
          {mainLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `px-4 py-2 text-sm font-medium transition-colors rounded-md hover:bg-accent hover:text-accent-foreground ${
                  isActive 
                    ? "text-primary bg-accent/50" 
                    : "text-muted-foreground"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          
          {isAdmin && (
            <NavLink 
              to="/admin" 
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              Admin
            </NavLink>
          )}
        </nav>

        {/* Center - Logo, Search and Title */}
        <div className="flex items-center justify-center gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
              <Flame className="h-4.5 w-4.5" />
            </span>
            <span className="font-display text-xl text-maroon hidden sm:block">Shubkaryam</span>
          </Link>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <div className={`flex items-center transition-all duration-300 ${searchFocused ? 'w-64' : 'w-48'}`}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search services..."
                  className="bg-background pl-9 pr-4 h-9 text-sm border-border focus:border-primary transition-all duration-300"
                />
              </div>
            </div>
          </form>
        </div>

        {/* Right Side - Auth Buttons */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 h-auto px-2 hover:bg-transparent">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-maroon text-white">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="text-sm">
                      <div className="font-medium text-foreground text-left">{user.firstName || user.email}</div>
                      {(user as any).phone && (user as any).place && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {(user as any).phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {(user as any).place}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.firstName || user.email}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                    <UserCircle className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/bookings" className="flex items-center gap-2 cursor-pointer">
                    <Calendar className="h-4 w-4" />
                    <span>My Bookings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/invite" className="flex items-center gap-2 cursor-pointer">
                    <Gift className="h-4 w-4" />
                    <span>Invite Friends</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 cursor-pointer">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/signin")}>
                Sign in
              </Button>
              <Button size="sm" className="bg-primary" onClick={() => navigate("/services")}>
                Book a pooja
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden absolute left-4" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="px-4 py-3 space-y-1">
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Services
              </div>
              {serviceLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-accent"
                >
                  <div>{l.label}</div>
                  <div className="text-xs text-muted-foreground">{l.description}</div>
                </Link>
              ))}
            </div>
            
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search services..."
                    className="bg-background pl-9"
                  />
                </div>
              </form>
            </div>
            
            <div className="mb-4">
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Account
              </div>
              <Link to="/profile" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
              <Link to="/bookings" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>My Bookings</span>
                </div>
              </Link>
              <Link to="/invite" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-accent">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span>Invite Friends</span>
                </div>
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-foreground rounded-md hover:bg-accent">
                  Admin
                </Link>
              )}
            </div>
            
            <div className="pt-3 border-t border-border">
              {user ? (
                <Button variant="outline" size="sm" className="w-full" onClick={handleSignOut}>
                  Sign out
                </Button>
              ) : (
                <div className="space-y-2">
                  <Button size="sm" className="w-full" onClick={() => { setOpen(false); navigate("/signin"); }}>
                    Sign in
                  </Button>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => { setOpen(false); navigate("/services"); }}>
                    Book a pooja
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;

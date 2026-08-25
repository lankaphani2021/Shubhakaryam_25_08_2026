import Layout from "@/components/Layout";
import InviteFriends from "@/components/InviteFriends";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const InvitePage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin?next=/invite");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div className="mx-auto max-w-4xl px-4 py-14">
        <div className="mb-8">
          <h1 className="text-4xl font-display text-foreground">Invite Friends</h1>
          <p className="mt-2 text-muted-foreground">
            Share the blessing of traditional ceremonies with your friends and family. They get ₹100 off, and you earn rewards too!
          </p>
        </div>
        
        <InviteFriends />
      </div>
    </Layout>
  );
};

export default InvitePage;
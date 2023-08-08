import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AboutUsPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  
  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/img-generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // You can provide any additional data if needed
      });
      
      const data = await response.json();
      if (response.status === 200) {
        setImageUrl(data.imageUrl);
      } else {
        // Handle error here if necessary
        console.error(data.error);
      }
    } catch (error) {
      // Handle error here if necessary
      console.error("Error while fetching the image:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    async function checkLoginStatus(req, res) {
      
      try {
        const response = await fetch("/api/check-login-status", {
          method:"GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        
        const data = await response.json();
      
        if (!data.isLoggedIn) {
         
          // User is not logged in, redirect to the login page
          router.push("/login"); // Replace with your login page URL
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }

    checkLoginStatus();
  }, []);

  return (
    <div>
      <button onClick={handleGenerateImage} disabled={loading}>
        Generate Image
      </button>

      {loading && <p>Loading...</p>}
      
      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <img src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;

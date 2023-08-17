import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";


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
        body: JSON.stringify({}),
      });

      const data = await response.json();
      if (response.status === 200) {
        setImageUrl(data.imageUrl);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error while fetching the image:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function checkLoginStatus(req, res) {
      try {
        const response = await fetch("/api/check-login-status", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!data.isLoggedIn) {
          // User is not logged in, redirect to the login page
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
      }
    }

    checkLoginStatus();
  }, [router]);

  return (
    <div>
      <button onClick={handleGenerateImage} disabled={loading}>
        Generate Image
      </button>

      {loading && <p>Loading...</p>}

      {imageUrl && (
        <div>
          <h3>Generated Image:</h3>
          <Image src={imageUrl} alt="Generated" />
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;

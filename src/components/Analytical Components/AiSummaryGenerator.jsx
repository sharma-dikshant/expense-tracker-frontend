import Markdown from "react-markdown";
import ModalWindow from "../../ui/ModalWindow";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function AiSummaryGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");

  async function LoadAiSummary(setSummary) {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ai/summary`,
        {
          withCredentials: true,
        }
      );
      setSummary(response.data.data || "Summary Not Available");
    } catch (error) {
      console.error(error);
      console.log("error in generating Summaray", error);
      setSummary("Error in Generating Summary! Please Try Again Later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ModalWindow
      text={"Generate Ai Summary"}
      onClickFn={(setter = setSummary) => LoadAiSummary(setter)}
    >
      {isLoading ? <CircularProgress /> : <Markdown>{summary}</Markdown>}
    </ModalWindow>
  );
}

export default AiSummaryGenerator;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
import EditorToolbar, { modules, formats } from "./toolbar";
import { GoogleGenerativeAI } from "@google/generative-ai";

import myAnimation from "./ai.gif";
import { useSelector, useDispatch } from "react-redux";

import UseAnimations from "react-useanimations";
import infinity from "react-useanimations/lib/infinity";
import Testing from "../Testing/Testing";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [showFields, setShowFields] = useState(false);
  const [content, setContent] = useState("");
  const [showIcon, setShowicon] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const [isGeneratingIdeas, setIsGeneratingIdeas] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");
  const [promptText, setPromptText] = useState("");
  let { userInfo } = useSelector((state) => state.user);
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const genAI = new GoogleGenerativeAI(
    "AIzaSyCoZ7Oc7MxLX6K_2D55wJqZ7zqor9Awtt4"
  );
  let request;
  useEffect(() => {
    const handleResize = () => {
      const form = document.getElementById("create-post-form");
      if (form) {
        setFormHeight(`${form.scrollHeight}px`);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePromptSelection = (e) => {
    setSelectedPrompt(e.target.value);
  };

  const generatePrompt = async () => {
    try {
      let prompt = promptText;

      switch (selectedPrompt) {
        case "Product Spotlight":
          request = ` a captivating 1500-word blog spotlighting the heritage and craftsmanship of Pakistani handmade rugs. This blog is tailored for home decor enthusiasts seeking authentic inspiration to elevate their living spaces with cultural richness and timeless elegance. Utilize user-generated keywords to ensure SEO optimization and content relevance, focusing on topics such as the intricate patterns, vibrant colors, and cultural significance of these rugs. Set a conversational tone that invites readers on a visual journey, weaving engaging storytelling with informative details. Begin by introducing the historical and cultural context of Pakistani rugs, showcasing their versatility in modern and traditional interiors. Dive deeper into the craftsmanship techniques, highlighting the artisanal skills passed down through generations. Provide purchasing advice, design tips, and suggestions for incorporating these rugs into various room settings, evoking feelings of admiration and appreciation for the artistry behind each piece.`;
          break;
        case "Home Decor Trends":
          request = ` an engaging 1500-word blog exploring the latest trends in Pakistani home decor. This blog is curated for interior design enthusiasts seeking fresh inspiration to infuse their homes with style and personality. Integrate user-generated keywords to enhance SEO and align the content with reader interests. Set a conversational tone that blends visual inspiration with expert insights and practical tips. Begin by introducing the evolving landscape of Pakistani home decor, highlighting the fusion of traditional motifs with contemporary design elements. Dive deeper into trending color palettes, furniture styles, and decor accessories, showcasing real-life examples and inspiring imagery. Provide actionable advice for incorporating these trends into different living spaces, from cozy apartments to spacious villas. Ensure a smooth flow that guides readers through diverse topics, sparking feelings of excitement and creativity as they embark on their own decor journeys.`;
          break;
        case "Sustainable Living Insights":
          request = ` an informative 1500-word blog offering actionable insights and tips for embracing sustainable living practices in Pakistan. This blog is targeted at environmentally conscious individuals seeking practical guidance to reduce their ecological footprint and live in harmony with nature. Incorporate user-generated keywords to address specific interests and concerns, ensuring SEO optimization and content relevance. Set a friendly and informative tone that empowers readers to make positive changes in their daily lives. Begin by outlining the importance of sustainability in the Pakistani context, highlighting environmental challenges and opportunities for improvement. Dive deeper into eco-friendly solutions for energy conservation, waste reduction, and green living, providing practical tips, local resources, and success stories. Showcase innovative initiatives and community-driven projects that demonstrate the power of collective action. Ensure a logical flow that guides readers through topics such as sustainable home design, eco-friendly transportation, and ethical consumption, inspiring feelings of empowerment and optimism for a greener future.`;
          break;
        case "Local Artisan Spotlight":
          request = ` a compelling 1500-word blog highlighting the talent and creativity of Pakistani artisans across traditional crafts. This blog is designed for art enthusiasts and cultural aficionados eager to delve into the rich tapestry of Pakistan's artisanal heritage. Utilize user-generated keywords to ensure content alignment with reader interests, enhancing SEO optimization and relevance. Set a conversational and appreciative tone, showcasing the craftsmanship, cultural heritage, and artistic expression embodied in each handmade creation. Ensure a seamless flow that blends storytelling with visual imagery and interactive elements to foster appreciation and community engagement. Invite readers to explore the diverse world of Pakistani artisanal traditions, from pottery and woodworking to textile weaving and metalwork, evoking feelings of admiration and pride in the country's vibrant artisanal landscape.`;
          break;
        case "Wedding Decor Inspiration":
          request = ` an inspiring 1500-word blog offering creative decor ideas and design inspirations for Pakistani-themed weddings. Tailored for couples planning their special day, this blog invites readers on a journey of love, culture, and celebration. Integrate user-generated keywords to enhance SEO and personalize the content to resonate with reader interests. Set a warm and celebratory tone that evokes feelings of excitement and anticipation, blending curated concepts, styling tips, and practical advice. Begin by exploring the rich tapestry of Pakistani wedding traditions and cultural motifs, offering insights into incorporating them into modern wedding decor. Dive deeper into themes, color schemes, and decor elements inspired by Pakistani culture, showcasing real-life examples and inspiring imagery. Ensure a lively and engaging flow that invites reader interaction and collaboration, fostering a joyful and memorable wedding planning experience infused with the unique cultural identity of Pakistan.`;
          break;
        case "Home Buying Guide":
          request = ` a comprehensive 1500-word guide for Pakistani homeowners embarking on the journey of furnishing and decorating their homes. Tailored to empower and inspire, this blog offers expert advice, product recommendations, and shopping tips to help readers create personalized living spaces that reflect their lifestyle and cultural identity. Utilize user-generated keywords to address specific needs, preferences, and budget considerations, enhancing SEO optimization and content relevance. Set a friendly and informative tone that engages readers from start to finish, providing actionable insights and practical guidance. Begin by outlining key considerations for home furnishing and decor, from space planning and furniture selection to color palettes and decor styling. Dive deeper into topics such as budgeting tips, shopping strategies, and DIY hacks, offering readers the tools and inspiration they need to transform their homes with confidence and creativity. Ensure a logical flow that guides readers through the home buying process with clarity and enthusiasm, evoking feelings of excitement and satisfaction as they embark on their home decor journey.`;
          break;
        case "Cultural Heritage Highlights":
          request = `on an immersive 1500-word journey through Pakistan's cultural heritage, designed to captivate history buffs, travelers, and cultural enthusiasts alike. Utilize user-generated keywords to ensure content relevance and SEO optimization, enhancing the blog's discoverability and appeal. Set a captivating and informative tone that transports readers to the heart of Pakistan's rich cultural tapestry, weaving together vivid storytelling, captivating visuals, and interactive experiences. Begin by exploring the architectural marvels, historic landmarks, and cultural treasures that define Pakistan's diverse regions, offering insights into their historical significance and cultural legacy. Dive deeper into topics such as art, music, literature, and cuisine, showcasing the depth and diversity of Pakistan's cultural heritage. Invite readers to immerse themselves in the vibrant tapestry of Pakistani culture, fostering a sense of wonder and appreciation for the country's rich history and identity.`;
          break;
        case "Culinary Delights Showcase":
          request = ` a mouthwatering 1500-word blog celebrating the flavors and aromas of Pakistani cuisine, designed to delight foodies and cooking enthusiasts. This blog invites readers on a culinary journey through the diverse culinary traditions and regional specialties of Pakistan, showcasing authentic recipes, cooking techniques, and culinary anecdotes. Utilize user-generated keywords to curate a culinary experience tailored to reader tastes and interests, enhancing SEO optimization and content relevance. Set a warm and inviting tone that evokes feelings of happiness and satisfaction with every bite, sharing stories of family gatherings, festive celebrations, and cherished food memories. Begin by exploring the rich tapestry of Pakistani cuisine, from aromatic curries and fragrant rice dishes to succulent kebabs and sweet desserts. Dive deeper into regional specialties and traditional cooking methods, offering readers the opportunity to savor the diverse flavors and cultural influences that shape Pakistani culinary identity. Ensure a flavorful and engaging flow that leaves readers inspired to explore the world of Pakistani cuisine with curiosity and enthusiasm.`;
          break;
        default:
          break;
      }
      const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: 70000,
        temperature: 0.9,
        topP: 0.1,
        topK: 16,
      };
      const model = genAI.getGenerativeModel(
        { model: "gemini-pro" },
        generationConfig
      );

      const userPrompt = `Write an outline keeping in mind these keywords, ${promptText}, make sure you include them heading and outline should revolve the keywords and the general strucuture would be  ${request}`;
      console.log(userPrompt);
      const userMessage = await model.generateContent(userPrompt);

      const userResponse = await userMessage.response.text();
      console.log("First Response:", userResponse);

      const modelMessage = await model.generateContent(
        `Write a full fledged 2000 SEO optimized words article on the following outline? ${userResponse}, make sure each heading is detailed, dont stop until you reach 2000 words `
      );

      const blogContent = modelMessage.response.text();

      setContent(blogContent);
      setShowicon(true);
    } catch (error) {
      console.error("Error generating prompt:", error);
    } finally {
      setIsGeneratingIdeas(false);
    }
  };

  const handleIdeaGenerationClick = async () => {
    setIsGeneratingIdeas(true);

    if (promptText && selectedPrompt) {
      await generatePrompt(); // Generate the prompt based on user input and selected prompt
      try {
      } catch (error) {
        console.error("Error generating blog post:", error);
      } finally {
        setIsGeneratingIdeas(false);
        setShowicon(false);
      }
    } else {
      setIsGeneratingIdeas(false);
    }
  };
  console.log(userInfo.token);
  const submitBlogPost = async (e, blogContent) => {
    e.preventDefault();
    try {
      console.log(userInfo);
      if (userInfo && userInfo.token) {
        const response = await axios.post(
          "http://localhost:4000/api/blogs/posts",
          {
            title,
            content: blogContent,
            image: imageURL,
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        console.log("New post created:", response.data);
        navigate(`/getallblogs`);
      } else {
        console.error("User info or token is missing");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (value) => {
    setContent(value);
    setFormHeight(
      `${document.getElementById("create-post-form").scrollHeight}px`
    );
  };
  const handleImageChange = (e) => setImageURL(e.target.value);

  const handleInputChange = (e) => setPromptText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setShowicon(true);

      await handleIdeaGenerationClick();
    } catch (error) {
      console.error("Error handling submit:", error);
    }
  };
  const [isPlaying, setIsPlaying] = useState(false);
  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div style={{ display: "flex" }}>
      <Testing />
      <div className="create-post-container">
        <div>
          <button onClick={toggleFields} className="addai-button">
            Use AI
          </button>
          {showFields && (
            <div className="input-container">
              <div style={{ marginBottom: "20px" }}>
                <input
                  type="text"
                  placeholder="Enter a topic or keywords"
                  value={promptText}
                  onChange={handleInputChange}
                  style={{ borderRadius: "80px" }}
                />
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#f0f0f0",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <select
                  onChange={handlePromptSelection}
                  value={selectedPrompt}
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "5px",
                    borderRadius: "5px",
                    backgroundColor: "inherit",
                  }}
                >
                  <option value="">Select Prompt</option>
                  <option value="Product Spotlight">Product Spotlight</option>
                  <option value="Home Decor Trends">Home Decor Trends</option>
                  <option value="Sustainable Living Insights">
                    Sustainable Living Insights
                  </option>
                  <option value="Local Artisan Spotlight">
                    Local Artisan Spotlight
                  </option>
                  <option value="Wedding Decor Inspiration">
                    Wedding Decor Inspiration
                  </option>
                  <option value="Home Buying Guide">Home Buying Guide</option>
                  <option value="Cultural Heritage Highlights">
                    Cultural Heritage Highlights
                  </option>
                  <option value="Culinary Delights Showcase">
                    Culinary Delights Showcase
                  </option>
                </select>
              </div>
              {showIcon ? (
                <div style={{ marginBottom: "20px", marginRight: "20px" }}>
                  <UseAnimations
                    animation={infinity}
                    size={56}
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              ) : (
                <div style={{ marginBottom: "20px", marginRight: "20px" }}>
                  <button
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                    className="generate-button"
                  >
                    Generate
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <form
          id="create-post-form"
          onSubmit={(e) => submitBlogPost(e, content)}
          className="create-post-form"
          style={{ height: formHeight }}
        >
          <div className="form-field">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Enter a captivating title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="text-editor">
            <label htmlFor="content">Content:</label>
            <EditorToolbar />
            <ReactQuill
              theme="snow"
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder={"Write something awesome..."}
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="form-field">
            <label htmlFor="image-url">Image URL:</label>
            <input
              type="text"
              id="image-url"
              placeholder="Add an image to enhance your post"
              value={imageURL}
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" className="publish-button">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;

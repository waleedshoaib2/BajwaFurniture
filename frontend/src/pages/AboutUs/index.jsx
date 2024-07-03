import React from "react";

const AboutUs = () => {
  return (
    <div style={{ position: "relative" }}>
      <img
        src="https://dhb3yazwboecu.cloudfront.net/1384/collections/PARALEL/Point_paralel_1920.jpg"
        alt=""
        style={{
          width: "100%",
          height: "auto",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          // boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
          // borderRadius: "20px",
          border: "none", // Remove border
        }}
      />
      <div style={{ padding: "0 50px" }}>
        <img
          src="https://dhb3yazwboecu.cloudfront.net/1384/collections/PARALEL/Point_paralel_1920.jpg"
          alt=""
          style={{
            width: "100%",
            height: "auto",
            paddingBottom: "80px",
            // boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
            // borderRadius: "20px",
          }}
        />
        <div style={styles.aboutUs}>
          <h1
            style={{
              ...styles.heading,
              // marginTop: "30px",
              margin: "60px",
              // marginbottom: "0px",
              fontSize: "56px",
            }}
          >
            About Us
          </h1>
          <div
            style={{
              ...styles.content,
              textAlign: "justify",
              fontSize: "20px",
            }}
          >
            <div style={styles.section}>
              <div style={styles.ourstory}>
                <img
                  src="https://assets.vogue.com/photos/66070733f43df49e80c7c0c5/1:1/w_1416,h_1416,c_limit/outdoor%20furniture%20site.jpeg"
                  alt=""
                  style={{
                    width: "400px",
                    height: "500px",
                    marginRight: "100px",
                    marginLeft: "100px",
                    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                    borderRadius: "20px",
                  }}
                />
                <div>
                  <h2 style={styles.sectionHeading}>Our Story</h2>
                  <p style={styles.paragraph}>
                    Welcome to Bajwa Furniture Store where we believe that
                    furniture isn't just about functionality; it's about
                    creating spaces that reflect your style, personality, and
                    comfort. It began with a simple mission: to provide
                    high-quality furniture that combines impeccable
                    craftsmanship with affordability. What started as a passion
                    project has now grown into a thriving online store, serving
                    customers across Pakistan. We are committed to offering a
                    wide range of furniture options, from classic to
                    contemporary styles, ensuring that there's something for
                    everyone. Our dedication to quality and customer
                    satisfaction drives everything we do, and we're excited to
                    help you furnish your space with pieces you'll love.
                  </p>
                </div>
              </div>
            </div>
            <div style={styles.section}>
              <div>
                <h2 style={styles.sectionHeading}>Our Philosophy</h2>
                <p style={styles.paragraph}>
                  At Bajwa Furniture Store, we understand that your home is your
                  sanctuary. That's why we handpick each piece in our
                  collection, focusing on timeless designs, durability, and
                  sustainability. Our dedicated team scours the market to bring
                  you the finest furniture crafted with attention to detail and
                  quality materials. Whether you're furnishing a cozy apartment
                  or a spacious home, we offer a curated selection to suit every
                  taste and budget. From elegant sofas that invite relaxation to
                  sturdy dining tables perfect for gathering family and friends,
                  our range encompasses a variety of styles to complement any
                  interior aesthetic. Moreover, we prioritize sustainability in
                  our sourcing practices, ensuring that our furniture not only
                  enhances your living space but also contributes positively to
                  the environment. By choosing pieces from our collection,
                  you're making a conscious decision to support eco-friendly
                  practices without compromising on style or comfort. Visit us
                  today and explore our showroom to experience the essence of
                  Bajwa Furniture Store firsthand. Let us help you transform
                  your house into a home filled with warmth, character, and
                  lasting beauty.
                </p>
              </div>
              <img
                src="https://akamai-scene7.grandinroad.com/is/image/frontgate/outdoor_shop_the_look?$wgih$"
                alt=""
                style={{
                  width: "400px",
                  height: "500px",
                  marginRight: "100px",
                  marginLeft: "100px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                  borderRadius: "20px",
                }}
              />
            </div>

            <div style={styles.section}>
              <img
                src="https://5.imimg.com/data5/SELLER/Default/2023/6/316948467/HO/YR/IV/633956/office-modular-furniture-500x500.png"
                alt=""
                style={{
                  width: "400px",
                  height: "500px",
                  marginRight: "100px",
                  marginLeft: "100px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                  borderRadius: "20px",
                }}
              />
              <div>
                <h2 style={styles.sectionHeading}>What Sets Us Apart</h2>
                <ul style={styles.list}>
                  <li>
                    <strong>Quality Assurance:</strong> We work closely with
                    skilled artisans and reputable manufacturers to ensure that
                    every piece meets our stringent quality standards.
                  </li>
                  <li>
                    <strong>Affordability:</strong> We believe that everyone
                    deserves to have a beautiful home, which is why we strive to
                    offer competitive prices without compromising on quality.
                  </li>
                  <li>
                    <strong>Customer Satisfaction:</strong> Your satisfaction is
                    our top priority. From browsing our website to delivery and
                    beyond, we're committed to providing exceptional service
                    every step of the way.
                  </li>
                </ul>
              </div>
            </div>
            <div style={styles.section}>
              <div>
                <h2 style={styles.sectionHeading}>
                  Our Commitment to Sustainability
                </h2>
                <p style={styles.paragraph}>
                  As stewards of the environment, we're dedicated to minimizing
                  our ecological footprint. That's why we prioritize sustainable
                  materials and eco-friendly practices in our sourcing and
                  operations. From selecting reclaimed wood for our furniture to
                  utilizing energy-efficient manufacturing processes, we strive
                  to make responsible choices that preserve natural resources
                  and reduce environmental impact. Our commitment to
                  sustainability extends beyond just the products we offer. We
                  continuously seek innovative ways to improve our operations,
                  implementing recycling programs, and exploring renewable
                  energy solutions to further reduce our carbon footprint. By
                  integrating sustainability into every aspect of our business,
                  we aim to set an example for the industry and inspire others
                  to adopt environmentally conscious practices. When you choose
                  Bajwa Furniture Store, you're not just investing in
                  beautifully crafted furniture; you're also supporting a
                  company that values the planet and is dedicated to making a
                  positive difference for future generations. Join us in our
                  mission to create a more sustainable world, one piece of
                  furniture at a time.
                </p>
              </div>
              <img
                src="https://ae01.alicdn.com/kf/Sa6f8b4fa61fc4498bd7d3a2188584b57r/Light-luxury-rock-slab-dining-table-and-chairs-combination-living-room-Scandinavian-modern-minimalist-rectangular-dining.jpg_Q90.jpg_.webp"
                alt=""
                style={{
                  width: "400px",
                  height: "500px",
                  marginRight: "100px",
                  marginLeft: "100px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                  borderRadius: "20px",
                }}
              />
            </div>
            <div style={styles.section}>
              <img
                src="https://funky-chunky-furniture.co.uk/cdn/shop/files/Chopwell_Farmhouse_Console_Table_square_d5ce42ae-3235-4e5b-8ccf-c4fc953bab14_500x.jpg?v=1695638380"
                alt=""
                style={{
                  width: "400px",
                  height: "500px",
                  marginRight: "100px",
                  marginLeft: "100px",
                  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.5)",
                  borderRadius: "20px",
                }}
              />
              <div>
                <h2 style={styles.sectionHeading}>Get in Touch</h2>
                <p style={styles.paragraph}>
                  Have a question about a product? Need assistance with your
                  order? We're here to help! Contact our friendly customer
                  support team at this email address BajwaFurniture@gmail.com.
                  Our dedicated team is committed to providing exceptional
                  service and addressing any inquiries or concerns you may have
                  promptly and courteously. Whether you're seeking advice on
                  furniture selection, tracking your order status, or seeking
                  assistance with assembly instructions, our knowledgeable staff
                  is ready to assist you every step of the way. We understand
                  that your satisfaction is paramount, and we strive to exceed
                  your expectations with personalized attention and reliable
                  assistance. Don't hesitate to reach out to us with any
                  questions or feedback. Your experience with Bajwa Furniture
                  Store is important to us, and we're here to ensure that it's
                  nothing short of excellent.
                </p>
              </div>
            </div>
            <p style={{ ...styles.paragraph, fontWeight: "bold" }}>
              Thank you for choosing Bajwa Furniture Store. We look forward to
              helping you transform your space into a place you'll love coming
              home to.
            </p>
          </div>
        </div>
        ;
      </div>
    </div>
  );
};

const styles = {
  aboutUs: {
    position: "relative",
    zIndex: 1,
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    color: "#333",
    fontSize: "48px", // Decreased font size
    fontWeight: "bold",
    marginBottom: "30px",
    // Remove bottom padding
    textAlign: "center", // Center align the heading
    backgroundImage: 'url("YOUR_IMAGE_SRC")', // Add your image source here
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right center", // Adjust as per your preference
    padding: "0 100px", // Adjust padding to make space for the image
  },
  section: {
    display: "flex",
    paddingBottom: "30px",
    marginBottom: "30px",
    border: "none", // Remove border
  },
  sectionHeading: {
    fontWeight: "bold",
    color: "#000",
    fontSize: "34px",
    marginBottom: "30px",
    paddingTop: "0px", // Remove padding
    textAlign: "center",
  },
  content: {
    lineHeight: "1.6",
  },
  paragraph: {
    margin: "20px",
    marginBottom: "40px", // Adjusted bottom margin for better spacing
    fontSize: "20px", // Decreased font size
  },
  list: {
    fontSize: "20px", // Decreased font size
    paddingLeft: "20px",
    marginBottom: "20px",
  },
  highlight: {
    color: "#f50057",
    fontWeight: "bold",
  },

  ourstory: {
    display: "flex",
  },
};

export default AboutUs;

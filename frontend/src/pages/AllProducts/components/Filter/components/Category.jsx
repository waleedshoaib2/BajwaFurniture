import React, { useState, useEffect } from "react";
import axios from "axios";
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import FilterCheckBox from "./FilterCheckBox";

const ListItemstyle = {
  borderBottom: "1px solid #CCCCCC",
  paddingTop: "20px",
  paddingBottom: "20px",
};

export default function Category({
  selectedCategories,
  setSelectedCategories,
}) {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("http://localhost:4000/categories/");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId, isChecked) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== categoryId)
      );
    }
  };

  return (
    <>
      <ListItemButton
        style={ListItemstyle}
        onClick={() => setOpenCategory(!openCategory)}
      >
        <ListItemText
          disableTypography
          sx={{
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
          primary="Category"
        />
        {openCategory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {categories.map((category) => (
            <ListItemButton key={category._id}>
              <FilterCheckBox
                label={category.name}
                onChange={(isChecked) =>
                  handleCategoryChange(category._id, isChecked)
                }
                checked={selectedCategories.includes(category._id)}
              />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

export default function CuisineCard(props) {
    const {cuisineName, imagePath}= props;
    
    return (
        <Card sx={{ width: 345, height: "100%", m: "auto" }}>
            <CardHeader
                style={{ textTransform: "capitalize" }}
                title={cuisineName }
            />
            <Link to={`/cuisines/${cuisineName}`}>
                <CardMedia
                component="img"
                height="194"
                image={imagePath}
                alt="Cuisine Name"
                />
            </Link>
        </Card>
    );
}

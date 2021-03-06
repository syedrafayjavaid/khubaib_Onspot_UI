import React, { Component, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import { Button, CardActionArea, CardActions, IconButton } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardBody from "@mui/material/CardContent";
import Portfolio from "../pages/Products";
import Products from "./Products"
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';


function Favourite() {
  // let cat = props.location.state.data;
  const [products, setProducts] = useState([]);



  // getting Products category wise
  const getProducts= async () => {
    
  
    var email = localStorage.getItem("email");

    console.log("user is is set to",email);

    await axios
      .get(`http://localhost:2000/api/user/favourite?email=${email}`)
      .then((res) => {
        setProducts(res.data.data);
       
      })
      .catch((err) => {
        console.log(err);
      });


  };

  // add to Fav 
 const deleteFromFav = async (product) => {
  var email = localStorage.getItem("email");
  let data = product;
  data.email = email;
 
  await axios
    .post("http://localhost:2000/api/products/favourite/delete", data)
    .then((res) => {
      if (res.data.code === 0) {
        alert("Product Deleted From Favourites")
        getProducts()
      }
      if (res.data.code === 1){
        alert("Product Already In You Favourite List")
      }
    })
    .catch((err) => {
      console.log(err);
    });
};



 

  useEffect(() => {
    getProducts()
  }, []);
  
  return (
    <>
    {localStorage.getItem("email")?
    <div>
          
    {products.length > 0 ? (
        <Card
          sx={{ maxWidth: 1200 }}
          style={{
            margin: "80px auto",
            borderRadius: "15px",
            boxShadow: "0 0 10px",
          }}
        >
          <Row>
            <Col
              xs="12"
              md="12"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#154360",
              }}
            >
              <h3 style={{ fontFamily: "fantasy", color: "white" }}>
                MY FAVOURITES
              </h3>
              <CardContent style={{ padding: "20px" ,marginTop:"20px"}}>
                <Row>
                  {products ? (
                    products.length > 0 ? (
                      products.map((suggestedProducts) => (
                        <Col lg="3" md="3" sm="4" xs="6">
                          <Card
                            className="cradTransformation"
                            style={{ boxShadow: "0 0 10px" }}
                          >
                            <IconButton onClick={()=>deleteFromFav(suggestedProducts)} style={{left:"7vw",top:"1vh",zIndex:'999',color:"#154360"}}> 
                              <HeartBrokenIcon/>
                            </IconButton>
                            <CardMedia className="itemCardImageDiv" style={{marginTop:"-6vh"}}>
                              <img
                                src={suggestedProducts.imageLink}
                                alt="No image"
                                className="img-fluid"
                                style={{ height: "300px" }}
                              />
                            </CardMedia>

                            <CardContent
                              style={{
                                marginTop: "-9px",
                                backgroundColor: "#FBFCFC",
                                minHeight: "100px",
                              }}
                            >
                              <Row style={{minHeight:"70px"}}>
                              <h
                                style={{
                                  fontFamily: "Georgia",
                                  fontWeight: "500",
                                  fontSize: "18",
                                  marginLeft: "-4px",
                                }}
                              >
                                {suggestedProducts.title}{" "}
                              </h>

                              </Row>
                            
                              <h6
                                style={{ color: "#3498DB", marginTop: "4px" }}
                              >
                                {" "}
                                Rs: {suggestedProducts.price}{" "}
                              </h6>
                              <a
                                style={{ color: "#3498DB", marginTop: "4px" }}
                                href={suggestedProducts.productLink}
                                target="_blank"
                              >
                                See Details{" "}
                              </a>
                            </CardContent>
                          </Card>
                          <br></br>
                          <br></br>
                        </Col>
                      
                      ))
                    ) : (
                      <strong>Loading Page Please Wait</strong>
                    )
                  ) : (
                    "Data not Found"
                  )}
                   
                </Row>
                
               
              </CardContent>

              <br></br>
              <br></br>
              <br></br>
            </Col>
          </Row>
        </Card>
      ) : (
        ""
      )}


    </div>

      :

  <Redirect from="/profile" to="login" />
    
    }
   
    </>
  );
}
export default Favourite;

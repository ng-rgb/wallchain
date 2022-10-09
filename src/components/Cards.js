import React from "react";
import Card from "./Card";

import image1 from "../imgs/noun_1.jpg";
import image2 from '../imgs/noun_2.jpg'
import image3 from '../imgs/noun_3.jpg'

const cards = [
  {
    id: 1,
    title: "Noun 1",
    image: image1,
    url: "https://imgur.com/a/DEr9ZEH",
  },
  {
    id: 2,
    title: "Noun 2",
    image: image2,
    url: "https://imgur.com/zw3iucj",
  },
  {
    id: 3,
    title: "Noun 3",
    image: image3,
    url: "https://imgur.com/zw3iucj",
  },
];

function Cards() {
  return (
    <div className="container d-flex h-100 d-grid gap-10 ">
      <div className="row">
        {cards.map(({ title, image, url, id }) => (
          <div className="col-md-4" key={id}>
            <Card imageSource={image} title={title} url={url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cards;
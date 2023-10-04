import React from "react";

type RatingProps = {
  rating: number;
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating); // Tam yıldızlar
  const decimalPart = rating - fullStars; // Ondalık kısım

  // Tam yıldızlar
  for (let i = 1; i <= fullStars; i++) {
    stars.push(
      <span
        key={`full-${i}`}
        style={{
          fontSize: "24px",
          color: "yellow",
        }}
      >
        ★
      </span>
    );
  }

  // Yarım yıldız
  if (decimalPart >= 0.5) {
    stars.push(
      <span
        key="half-star"
        style={{
          fontSize: "24px",
          color: "yellow",
        }}
      >
        ★
      </span>
    );
  } else if (decimalPart > 0) {
    // Eksik tam yıldızı gri olarak ekle
    stars.push(
      <span
        key="empty-star"
        style={{
          fontSize: "24px",
          color: "gray",
        }}
      >
        ★
      </span>
    );
  }

  // Eksik tam yıldızları gri olarak ekle
  const missingFullStars = 5 - stars.length;
  for (let i = 1; i <= missingFullStars; i++) {
    stars.push(
      <span
        key={`empty-${i}`}
        style={{
          fontSize: "24px",
          color: "gray",
        }}
      >
        ★
      </span>
    );
  }

  return <div>{stars}</div>;
};

export default Rating;

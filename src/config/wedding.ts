// Single editable configuration for all wedding details.
export const wedding = {
  groom: {
    name: "P. Monish",
    qualification: "B.Tech",
    work: "Cognizant, Coimbatore",
    father: "Mr. Shanmugam (a) K.R. Palanisamy",
    mother: "Mrs. K.S. Parameswari",
  },
  bride: {
    name: "R. Saranya",
    qualification: "B.Tech",
    work: "",
    father: "Mr. V. Ramasamy",
    mother: "Mrs. R. Selvi",
  },
  monogram: "M ❤ S",
  venue: {
    name: "Sri Karthikeyan Mahal",
    lines: ["College Pirivu,", "Gobichettipalayam."],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent("Sri Karthikeyan Mahal, College Pirivu, Gobichettipalayam, Tamil Nadu"),
  },
  reception: {
    title: "Reception",
    date: "Saturday, 21 November 2026",
    time: "6:00 PM – 9:00 PM",
  },
  muhurtham: {
    title: "Wedding Muhurtham",
    date: "Sunday, 22 November 2026",
    time: "6:00 AM – 6:30 AM",
    // 22 Nov 2026, 6:00 AM IST
    isoStart: "2026-11-22T06:00:00+05:30",
  },
  audioSrc: "/audio/wedding-background.mp3",
  closing: {
    message: "Your Presence and Blessings Will Make Our Celebration Special",
    signoff: "With Love, Family & Friends",
  },
} as const;

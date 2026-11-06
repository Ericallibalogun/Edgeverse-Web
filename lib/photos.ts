/**
 * Photos used across the site: open-licence pictures from Wikimedia Commons, credited in the footer.
 * None of them shows EBSL staff, offices or clients. TODO(EBSL): replace with EBSL's own photos where possible.
 */
export type Photo = { src: string; alt: string; title: string; creator: string; license: string; page: string };

export const photos = {
  "ikoyi-lagos": { src: "/img/photos/ikoyi-lagos.webp", alt: "Aerial view of Ikoyi, Lagos, with Victoria Island across the lagoon", title: "Ikoyi, Lagos, Nigeria", creator: "Holyreg", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Ikoyi,_Lagos,_Nigeria.jpg" },
  "workshop-notes": { src: "/img/photos/workshop-notes.webp", alt: "Whiteboard covered in sticky notes from a planning workshop", title: "Design Thinking Workshop WMDE 1", creator: "Corinna Schuster (WMDE)", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Design_Thinking_Workshop_WMDE_1.jpg" },
  "youth-conference": { src: "/img/photos/youth-conference.webp", alt: "Young speakers on stage at a youth conference in Nigeria", title: "Discovery For Youths 73", creator: "MediaMOF", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Discovery_For_Youths_73.jpg" },
  "lekki-bridge": { src: "/img/photos/lekki-bridge.webp", alt: "The Lekki-Ikoyi Link Bridge in Lagos, with cars crossing", title: "Lekki link bridge with vehicles", creator: "Omoeko Media", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Lekki_link_bridge_with_vehicles.jpg" },
  "lekki-bridge-night": { src: "/img/photos/lekki-bridge-night.webp", alt: "The Lekki-Ikoyi Link Bridge lit up at night", title: "Lekki link bridge at Night, Admiralty way, Lagos", creator: "Omoeko Media", license: "CC BY-SA 4.0", page: "https://commons.wikimedia.org/wiki/File:Lekki_link_bridge_at_Night,_Admiralty_way,_Lagos.jpg" },
  "optic-fibre": { src: "/img/photos/optic-fibre.webp", alt: "Glowing optical fibre cables in a patch panel", title: "Fujikura optic fiber at Science Museum", creator: "Syced", license: "CC0", page: "https://commons.wikimedia.org/wiki/File:Fujikura_optic_fiber_at_Science_Museum.jpg" },
  "fibre-install": { src: "/img/photos/fibre-install.webp", alt: "Technician guiding new fibre cable off a reel truck", title: "Guiding New Fiber from Reel Truck", creator: "Tessa Bury", license: "CC BY 4.0", page: "https://commons.wikimedia.org/wiki/File:Guiding_New_Fiber_from_Reel_Truck.jpg" },
  "support-agent": { src: "/img/photos/support-agent.webp", alt: "Support agent with a headset talking with a colleague", title: "Coralville, IA- Consumer Response Call Center (8620101568)", creator: "Consumer Financial Protection Bureau from United States", license: "Public domain", page: "https://commons.wikimedia.org/wiki/File:Coralville,_IA-_Consumer_Response_Call_Center_(8620101568).jpg" },
  "datacentre-racks": { src: "/img/photos/datacentre-racks.webp", alt: "Rows of server racks in a data centre", title: "Datacenter Server Racks (22370909788)", creator: "Carl Lender from Sunrise, USA", license: "CC BY 2.0", page: "https://commons.wikimedia.org/wiki/File:Datacenter_Server_Racks_(22370909788).jpg" },
  "server-hall": { src: "/img/photos/server-hall.webp", alt: "A large hall of server racks", title: "CERN Server 03", creator: "Florian Hirzinger - www.fh-ap.com", license: "CC BY-SA 3.0", page: "https://commons.wikimedia.org/wiki/File:CERN_Server_03.jpg" },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export const photo = (k: PhotoKey) => photos[k];
export const photoCredits: Photo[] = Object.values(photos);

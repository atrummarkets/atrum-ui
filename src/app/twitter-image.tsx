import { OG_SIZE, renderShareImage } from "@/lib/og";

export const alt = "ATRUM — Private Prediction Markets";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderShareImage();
}

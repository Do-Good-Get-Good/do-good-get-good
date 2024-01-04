import { ActivityImage } from "../../hooks/useCloudImages";
import { getImageForActivity } from "../../lib/images";

export interface IActivityImagesContext {
  images: ActivityImage[];
  loading: boolean;
  getImageForActivity: typeof getImageForActivity;
  error?: any;
}

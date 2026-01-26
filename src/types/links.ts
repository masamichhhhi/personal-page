export interface ExternalLink {
  platform: string;
  url: string;
  description: string;
  icon: string;
}

export interface Links {
  links: ExternalLink[];
}

interface IsotopeOptions {
  itemSelector?: string;
  layoutMode?: string;
  masonry?: object;
  filter?: string;
  [key: string]: any;
}

export class Isotope {
  constructor(element: Element | HTMLElement, options?: IsotopeOptions);
  arrange(options?: IsotopeOptions): void;
  reloadItems(): void;
  destroy(): void;
  // Add other methods if needed
}

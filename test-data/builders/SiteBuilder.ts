/**
 * [Site Builder - Test Data Builder Pattern]
 * 
 * PURPOSE:
 * Provides a fluent API for constructing Site configuration test data.
 * Demonstrates the Builder design pattern for creating test configurations.
 */

export interface SiteConfig {
  title: string;
  url: string;
  menuRatingItem: string;
}

/**
 * SiteBuilder - Provides fluent API for building SiteConfig objects
 * 
 * Default values:
 * - title: "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows"
 * - url: "https://www.imdb.com/"
 * - menuRatingItem: "Top 250 Movies"
 */
export class SiteBuilder {
  private title: string = "IMDb: Ratings, Reviews, and Where to Watch the Best Movies & TV Shows";
  private url: string = "https://www.imdb.com/";
  private menuRatingItem: string = "Top 250 Movies";

  /**
   * Set the site title
   * @param title - Page title
   */
  withTitle(title: string): this {
    this.title = title;
    return this;
  }

  /**
   * Set the site URL
   * @param url - Base URL
   */
  withUrl(url: string): this {
    this.url = url;
    return this;
  }

  /**
   * Set the menu rating item text
   * @param menuRatingItem - Navigation menu item text
   */
  withMenuRatingItem(menuRatingItem: string): this {
    this.menuRatingItem = menuRatingItem;
    return this;
  }

  /**
   * Build and return the SiteConfig object
   */
  build(): SiteConfig {
    return {
      title: this.title,
      url: this.url,
      menuRatingItem: this.menuRatingItem
    };
  }

  /**
   * Create a SiteBuilder preconfigured for staging environment
   */
  static withStaging(): SiteBuilder {
    return new SiteBuilder()
      .withTitle("IMDb (Staging): Ratings, Reviews, and Where to Watch")
      .withUrl("https://www.imdb.com/_evwa/")
      .withMenuRatingItem("Top 250 Movies");
  }
}

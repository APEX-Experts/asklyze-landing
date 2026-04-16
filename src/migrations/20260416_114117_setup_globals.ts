import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "navbar_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "navbar_content_locales" (
  	"home" varchar NOT NULL,
  	"features" varchar NOT NULL,
  	"pricing" varchar NOT NULL,
  	"blog" varchar NOT NULL,
  	"docs" varchar NOT NULL,
  	"about" varchar NOT NULL,
  	"contact" varchar NOT NULL,
  	"get_started" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "hero_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"watch_demo_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "hero_content_locales" (
  	"badge" varchar NOT NULL,
  	"title_before_span" varchar NOT NULL,
  	"title_span" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"get_started" varchar NOT NULL,
  	"watch_demo" varchar NOT NULL,
  	"disclaimer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "working_process_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "working_process_content_locales" (
  	"title" varchar NOT NULL,
  	"step1_title" varchar NOT NULL,
  	"step1_desc" varchar NOT NULL,
  	"step2_title" varchar NOT NULL,
  	"step2_desc" varchar NOT NULL,
  	"step3_title" varchar NOT NULL,
  	"step3_desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "trusted_by_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "trusted_by_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "why_choose_content_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "why_choose_content_features_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "why_choose_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "why_choose_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_content_location_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_content_location_lines_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_content_locales" (
  	"location_title" varchar NOT NULL,
  	"email_title" varchar NOT NULL,
  	"call_title" varchar NOT NULL,
  	"follow_title" varchar NOT NULL,
  	"follow_desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_hero_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_hero_content_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "feature_grid_content_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image" varchar NOT NULL
  );
  
  CREATE TABLE "feature_grid_content_features_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "feature_grid_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "feature_grid_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "common_cta_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"get_started_url" varchar NOT NULL,
  	"watch_demo_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "common_cta_content_locales" (
  	"get_started" varchar NOT NULL,
  	"watch_demo" varchar NOT NULL,
  	"disclaimer" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_cta_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_cta_content_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "content_split_content_section2_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "content_split_content_section2_features_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "content_split_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "content_split_content_locales" (
  	"section1_title" varchar NOT NULL,
  	"section1_desc" varchar NOT NULL,
  	"section1_cta" varchar NOT NULL,
  	"section1_badge_title" varchar NOT NULL,
  	"section1_badge_time" varchar NOT NULL,
  	"section2_title" varchar NOT NULL,
  	"section2_desc" varchar NOT NULL,
  	"section2_cta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content_tabs_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "tabbed_showcase_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "tabbed_showcase_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"dashboard" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "testimonials_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "testimonials_content_list_locales" (
  	"text" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "testimonials_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "testimonials_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faq_content_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faq_content_categories_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq_content_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faq_content_list_locales" (
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL,
  	"category" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faq_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "faq_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pricing_content_plans_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "pricing_content_plans_features_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_content_plans" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"period" varchar,
  	"is_recommended" boolean,
  	"href" varchar
  );
  
  CREATE TABLE "pricing_content_plans_locales" (
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"period_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pricing_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"href" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "pricing_content_locales" (
  	"tag" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"cta" varchar NOT NULL,
  	"recommended" varchar NOT NULL,
  	"monthly" varchar NOT NULL,
  	"yearly" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "gradient_cta_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "gradient_cta_content_locales" (
  	"title" varchar NOT NULL,
  	"desc" varchar NOT NULL,
  	"cta" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contact_us_content_form_company_size_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "contact_us_content_form_company_size_options_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "contact_us_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email1" varchar NOT NULL,
  	"email2" varchar NOT NULL,
  	"phone1" varchar NOT NULL,
  	"phone2" varchar NOT NULL,
  	"form_country_country_select" boolean,
  	"form_message_textarea" boolean,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "contact_us_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"location_label" varchar NOT NULL,
  	"location1" varchar NOT NULL,
  	"location2" varchar NOT NULL,
  	"email_label" varchar NOT NULL,
  	"call_label" varchar NOT NULL,
  	"call_times" varchar NOT NULL,
  	"form_name_label" varchar NOT NULL,
  	"form_name_placeholder" varchar NOT NULL,
  	"form_name_required" varchar NOT NULL,
  	"form_email_label" varchar NOT NULL,
  	"form_email_placeholder" varchar NOT NULL,
  	"form_email_required" varchar NOT NULL,
  	"form_email_invalid" varchar NOT NULL,
  	"form_country_label" varchar NOT NULL,
  	"form_country_placeholder" varchar NOT NULL,
  	"form_country_required" varchar NOT NULL,
  	"form_phone_label" varchar NOT NULL,
  	"form_phone_placeholder" varchar NOT NULL,
  	"form_phone_invalid" varchar NOT NULL,
  	"form_company_name_label" varchar NOT NULL,
  	"form_company_name_placeholder" varchar NOT NULL,
  	"form_company_name_required" varchar NOT NULL,
  	"form_company_size_label" varchar NOT NULL,
  	"form_company_size_placeholder" varchar NOT NULL,
  	"form_company_size_required" varchar NOT NULL,
  	"form_role_label" varchar NOT NULL,
  	"form_role_placeholder" varchar NOT NULL,
  	"form_role_required" varchar NOT NULL,
  	"form_subject_label" varchar NOT NULL,
  	"form_subject_placeholder" varchar NOT NULL,
  	"form_subject_required" varchar NOT NULL,
  	"form_message_label" varchar NOT NULL,
  	"form_message_placeholder" varchar NOT NULL,
  	"form_message_required" varchar NOT NULL,
  	"form_submit" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "footer_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"social_facebook" varchar NOT NULL,
  	"social_linkedin" varchar NOT NULL,
  	"social_instagram" varchar NOT NULL,
  	"social_twitter" varchar NOT NULL,
  	"social_youtube" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_content_locales" (
  	"company" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"services" varchar NOT NULL,
  	"digital_experience" varchar NOT NULL,
  	"address" varchar NOT NULL,
  	"nyc_office" varchar NOT NULL,
  	"alex_office" varchar NOT NULL,
  	"legal" varchar NOT NULL,
  	"quick_links" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"social_labels_facebook" varchar NOT NULL,
  	"social_labels_linkedin" varchar NOT NULL,
  	"social_labels_instagram" varchar NOT NULL,
  	"social_labels_twitter" varchar NOT NULL,
  	"social_labels_youtube" varchar NOT NULL,
  	"links_features" varchar NOT NULL,
  	"links_dashboard" varchar NOT NULL,
  	"links_portfolio" varchar NOT NULL,
  	"links_about" varchar NOT NULL,
  	"links_contact" varchar NOT NULL,
  	"links_blog" varchar NOT NULL,
  	"links_docs" varchar NOT NULL,
  	"rights" varchar NOT NULL,
  	"copyright" varchar NOT NULL,
  	"bottom_links_privacy" varchar NOT NULL,
  	"bottom_links_terms" varchar NOT NULL,
  	"bottom_links_security" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_section_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_section_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"show_all" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "blog_content_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"no_posts" varchar NOT NULL,
  	"topics_all" varchar NOT NULL,
  	"topics_tutorial" varchar NOT NULL,
  	"topics_industry_trends" varchar NOT NULL,
  	"topics_features" varchar NOT NULL,
  	"topics_security" varchar NOT NULL,
  	"topics_case_study" varchar NOT NULL,
  	"topics_product_update" varchar NOT NULL,
  	"article_author_label" varchar NOT NULL,
  	"article_read_time_label" varchar NOT NULL,
  	"article_mins" varchar NOT NULL,
  	"article_date_label" varchar NOT NULL,
  	"article_back" varchar NOT NULL,
  	"article_related_articles" varchar NOT NULL,
  	"article_unknown_author" varchar NOT NULL,
  	"article_general_category" varchar NOT NULL,
  	"article_post_not_found" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "metadata_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "metadata_content_locales" (
  	"home_title" varchar NOT NULL,
  	"home_description" varchar NOT NULL,
  	"blog_title" varchar NOT NULL,
  	"blog_description" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_description" varchar NOT NULL,
  	"privacy_title" varchar NOT NULL,
  	"privacy_description" varchar NOT NULL,
  	"terms_title" varchar NOT NULL,
  	"terms_description" varchar NOT NULL,
  	"security_title" varchar NOT NULL,
  	"security_description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "privacy_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"last_updated" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_content" varchar NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "terms_content_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "terms_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "terms_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "terms_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "terms_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"last_updated" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_content" varchar NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "security_content_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "security_content_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_key" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections_points" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections_points_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "security_content_additional_sections_locales" (
  	"title" varchar NOT NULL,
  	"content" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "security_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "security_content_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"last_updated" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"contact_title" varchar NOT NULL,
  	"contact_content" varchar NOT NULL,
  	"contact_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "navbar_content_locales" ADD CONSTRAINT "navbar_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navbar_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_content_locales" ADD CONSTRAINT "hero_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."hero_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "working_process_content_locales" ADD CONSTRAINT "working_process_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."working_process_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "trusted_by_content_locales" ADD CONSTRAINT "trusted_by_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."trusted_by_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "why_choose_content_features" ADD CONSTRAINT "why_choose_content_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."why_choose_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "why_choose_content_features_locales" ADD CONSTRAINT "why_choose_content_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."why_choose_content_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "why_choose_content_locales" ADD CONSTRAINT "why_choose_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."why_choose_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_content_location_lines" ADD CONSTRAINT "contact_content_location_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_content_location_lines_locales" ADD CONSTRAINT "contact_content_location_lines_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content_location_lines"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_content_locales" ADD CONSTRAINT "contact_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_hero_content_locales" ADD CONSTRAINT "contact_hero_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_hero_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "feature_grid_content_features" ADD CONSTRAINT "feature_grid_content_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feature_grid_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "feature_grid_content_features_locales" ADD CONSTRAINT "feature_grid_content_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feature_grid_content_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "feature_grid_content_locales" ADD CONSTRAINT "feature_grid_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."feature_grid_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "common_cta_content_locales" ADD CONSTRAINT "common_cta_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."common_cta_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_cta_content_locales" ADD CONSTRAINT "contact_cta_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_cta_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_section2_features" ADD CONSTRAINT "content_split_content_section2_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_section2_features_locales" ADD CONSTRAINT "content_split_content_section2_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content_section2_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_split_content_locales" ADD CONSTRAINT "content_split_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_split_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_tabs" ADD CONSTRAINT "tabbed_showcase_content_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_tabs_locales" ADD CONSTRAINT "tabbed_showcase_content_tabs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content_tabs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tabbed_showcase_content_locales" ADD CONSTRAINT "tabbed_showcase_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tabbed_showcase_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_list" ADD CONSTRAINT "testimonials_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_list_locales" ADD CONSTRAINT "testimonials_content_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials_content_locales" ADD CONSTRAINT "testimonials_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."testimonials_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_categories" ADD CONSTRAINT "faq_content_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_categories_locales" ADD CONSTRAINT "faq_content_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_list" ADD CONSTRAINT "faq_content_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_list_locales" ADD CONSTRAINT "faq_content_list_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_content_locales" ADD CONSTRAINT "faq_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans_features" ADD CONSTRAINT "pricing_content_plans_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans_features_locales" ADD CONSTRAINT "pricing_content_plans_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content_plans_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans" ADD CONSTRAINT "pricing_content_plans_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_plans_locales" ADD CONSTRAINT "pricing_content_plans_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content_plans"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pricing_content_locales" ADD CONSTRAINT "pricing_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pricing_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gradient_cta_content_locales" ADD CONSTRAINT "gradient_cta_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gradient_cta_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_content_form_company_size_options" ADD CONSTRAINT "contact_us_content_form_company_size_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_content_form_company_size_options_locales" ADD CONSTRAINT "contact_us_content_form_company_size_options_locales_pare_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us_content_form_company_size_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_us_content_locales" ADD CONSTRAINT "contact_us_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_us_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_locales" ADD CONSTRAINT "footer_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_section_content_locales" ADD CONSTRAINT "blog_section_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_section_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_content_locales" ADD CONSTRAINT "blog_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "metadata_content_locales" ADD CONSTRAINT "metadata_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."metadata_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections_points" ADD CONSTRAINT "privacy_content_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections_points_locales" ADD CONSTRAINT "privacy_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections" ADD CONSTRAINT "privacy_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_sections_locales" ADD CONSTRAINT "privacy_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections_points" ADD CONSTRAINT "privacy_content_additional_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections_points_locales" ADD CONSTRAINT "privacy_content_additional_sections_points_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections" ADD CONSTRAINT "privacy_content_additional_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_additional_sections_locales" ADD CONSTRAINT "privacy_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_content_locales" ADD CONSTRAINT "privacy_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections_points" ADD CONSTRAINT "terms_content_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections_points_locales" ADD CONSTRAINT "terms_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections" ADD CONSTRAINT "terms_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_sections_locales" ADD CONSTRAINT "terms_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections_points" ADD CONSTRAINT "terms_content_additional_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections_points_locales" ADD CONSTRAINT "terms_content_additional_sections_points_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections" ADD CONSTRAINT "terms_content_additional_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_additional_sections_locales" ADD CONSTRAINT "terms_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "terms_content_locales" ADD CONSTRAINT "terms_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."terms_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections_points" ADD CONSTRAINT "security_content_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections_points_locales" ADD CONSTRAINT "security_content_sections_points_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections" ADD CONSTRAINT "security_content_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_sections_locales" ADD CONSTRAINT "security_content_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections_points" ADD CONSTRAINT "security_content_additional_sections_points_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections_points_locales" ADD CONSTRAINT "security_content_additional_sections_points_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_additional_sections_points"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections" ADD CONSTRAINT "security_content_additional_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_additional_sections_locales" ADD CONSTRAINT "security_content_additional_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content_additional_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "security_content_locales" ADD CONSTRAINT "security_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."security_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "navbar_content_locales_locale_parent_id_unique" ON "navbar_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "hero_content_locales_locale_parent_id_unique" ON "hero_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "working_process_content_locales_locale_parent_id_unique" ON "working_process_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "trusted_by_content_locales_locale_parent_id_unique" ON "trusted_by_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "why_choose_content_features_order_idx" ON "why_choose_content_features" USING btree ("_order");
  CREATE INDEX "why_choose_content_features_parent_id_idx" ON "why_choose_content_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "why_choose_content_features_locales_locale_parent_id_unique" ON "why_choose_content_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "why_choose_content_locales_locale_parent_id_unique" ON "why_choose_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_content_location_lines_order_idx" ON "contact_content_location_lines" USING btree ("_order");
  CREATE INDEX "contact_content_location_lines_parent_id_idx" ON "contact_content_location_lines" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_content_location_lines_locales_locale_parent_id_uniq" ON "contact_content_location_lines_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_content_locales_locale_parent_id_unique" ON "contact_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_hero_content_locales_locale_parent_id_unique" ON "contact_hero_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "feature_grid_content_features_order_idx" ON "feature_grid_content_features" USING btree ("_order");
  CREATE INDEX "feature_grid_content_features_parent_id_idx" ON "feature_grid_content_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "feature_grid_content_features_locales_locale_parent_id_uniqu" ON "feature_grid_content_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "feature_grid_content_locales_locale_parent_id_unique" ON "feature_grid_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "common_cta_content_locales_locale_parent_id_unique" ON "common_cta_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_cta_content_locales_locale_parent_id_unique" ON "contact_cta_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "content_split_content_section2_features_order_idx" ON "content_split_content_section2_features" USING btree ("_order");
  CREATE INDEX "content_split_content_section2_features_parent_id_idx" ON "content_split_content_section2_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "content_split_content_section2_features_locales_locale_paren" ON "content_split_content_section2_features_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "content_split_content_locales_locale_parent_id_unique" ON "content_split_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "tabbed_showcase_content_tabs_order_idx" ON "tabbed_showcase_content_tabs" USING btree ("_order");
  CREATE INDEX "tabbed_showcase_content_tabs_parent_id_idx" ON "tabbed_showcase_content_tabs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "tabbed_showcase_content_tabs_locales_locale_parent_id_unique" ON "tabbed_showcase_content_tabs_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tabbed_showcase_content_locales_locale_parent_id_unique" ON "tabbed_showcase_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "testimonials_content_list_order_idx" ON "testimonials_content_list" USING btree ("_order");
  CREATE INDEX "testimonials_content_list_parent_id_idx" ON "testimonials_content_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "testimonials_content_list_locales_locale_parent_id_unique" ON "testimonials_content_list_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "testimonials_content_locales_locale_parent_id_unique" ON "testimonials_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_content_categories_order_idx" ON "faq_content_categories" USING btree ("_order");
  CREATE INDEX "faq_content_categories_parent_id_idx" ON "faq_content_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faq_content_categories_locales_locale_parent_id_unique" ON "faq_content_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faq_content_list_order_idx" ON "faq_content_list" USING btree ("_order");
  CREATE INDEX "faq_content_list_parent_id_idx" ON "faq_content_list" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faq_content_list_locales_locale_parent_id_unique" ON "faq_content_list_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "faq_content_locales_locale_parent_id_unique" ON "faq_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pricing_content_plans_features_order_idx" ON "pricing_content_plans_features" USING btree ("_order");
  CREATE INDEX "pricing_content_plans_features_parent_id_idx" ON "pricing_content_plans_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pricing_content_plans_features_locales_locale_parent_id_uniq" ON "pricing_content_plans_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pricing_content_plans_order_idx" ON "pricing_content_plans" USING btree ("_order");
  CREATE INDEX "pricing_content_plans_parent_id_idx" ON "pricing_content_plans" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pricing_content_plans_locales_locale_parent_id_unique" ON "pricing_content_plans_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pricing_content_locales_locale_parent_id_unique" ON "pricing_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "gradient_cta_content_locales_locale_parent_id_unique" ON "gradient_cta_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contact_us_content_form_company_size_options_order_idx" ON "contact_us_content_form_company_size_options" USING btree ("_order");
  CREATE INDEX "contact_us_content_form_company_size_options_parent_id_idx" ON "contact_us_content_form_company_size_options" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "contact_us_content_form_company_size_options_locales_locale_" ON "contact_us_content_form_company_size_options_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "contact_us_content_locales_locale_parent_id_unique" ON "contact_us_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "footer_content_locales_locale_parent_id_unique" ON "footer_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_section_content_locales_locale_parent_id_unique" ON "blog_section_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "blog_content_locales_locale_parent_id_unique" ON "blog_content_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "metadata_content_locales_locale_parent_id_unique" ON "metadata_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_content_sections_points_order_idx" ON "privacy_content_sections_points" USING btree ("_order");
  CREATE INDEX "privacy_content_sections_points_parent_id_idx" ON "privacy_content_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_content_sections_points_locales_locale_parent_id_uni" ON "privacy_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_content_sections_order_idx" ON "privacy_content_sections" USING btree ("_order");
  CREATE INDEX "privacy_content_sections_parent_id_idx" ON "privacy_content_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_content_sections_locales_locale_parent_id_unique" ON "privacy_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_content_additional_sections_points_order_idx" ON "privacy_content_additional_sections_points" USING btree ("_order");
  CREATE INDEX "privacy_content_additional_sections_points_parent_id_idx" ON "privacy_content_additional_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_content_additional_sections_points_locales_locale_pa" ON "privacy_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "privacy_content_additional_sections_order_idx" ON "privacy_content_additional_sections" USING btree ("_order");
  CREATE INDEX "privacy_content_additional_sections_parent_id_idx" ON "privacy_content_additional_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "privacy_content_additional_sections_locales_locale_parent_id" ON "privacy_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "privacy_content_locales_locale_parent_id_unique" ON "privacy_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_content_sections_points_order_idx" ON "terms_content_sections_points" USING btree ("_order");
  CREATE INDEX "terms_content_sections_points_parent_id_idx" ON "terms_content_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "terms_content_sections_points_locales_locale_parent_id_uniqu" ON "terms_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_content_sections_order_idx" ON "terms_content_sections" USING btree ("_order");
  CREATE INDEX "terms_content_sections_parent_id_idx" ON "terms_content_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "terms_content_sections_locales_locale_parent_id_unique" ON "terms_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_content_additional_sections_points_order_idx" ON "terms_content_additional_sections_points" USING btree ("_order");
  CREATE INDEX "terms_content_additional_sections_points_parent_id_idx" ON "terms_content_additional_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "terms_content_additional_sections_points_locales_locale_pare" ON "terms_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "terms_content_additional_sections_order_idx" ON "terms_content_additional_sections" USING btree ("_order");
  CREATE INDEX "terms_content_additional_sections_parent_id_idx" ON "terms_content_additional_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "terms_content_additional_sections_locales_locale_parent_id_u" ON "terms_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "terms_content_locales_locale_parent_id_unique" ON "terms_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "security_content_sections_points_order_idx" ON "security_content_sections_points" USING btree ("_order");
  CREATE INDEX "security_content_sections_points_parent_id_idx" ON "security_content_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "security_content_sections_points_locales_locale_parent_id_un" ON "security_content_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "security_content_sections_order_idx" ON "security_content_sections" USING btree ("_order");
  CREATE INDEX "security_content_sections_parent_id_idx" ON "security_content_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "security_content_sections_locales_locale_parent_id_unique" ON "security_content_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "security_content_additional_sections_points_order_idx" ON "security_content_additional_sections_points" USING btree ("_order");
  CREATE INDEX "security_content_additional_sections_points_parent_id_idx" ON "security_content_additional_sections_points" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "security_content_additional_sections_points_locales_locale_p" ON "security_content_additional_sections_points_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "security_content_additional_sections_order_idx" ON "security_content_additional_sections" USING btree ("_order");
  CREATE INDEX "security_content_additional_sections_parent_id_idx" ON "security_content_additional_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "security_content_additional_sections_locales_locale_parent_i" ON "security_content_additional_sections_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "security_content_locales_locale_parent_id_unique" ON "security_content_locales" USING btree ("_locale","_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "navbar_content" CASCADE;
  DROP TABLE "navbar_content_locales" CASCADE;
  DROP TABLE "hero_content" CASCADE;
  DROP TABLE "hero_content_locales" CASCADE;
  DROP TABLE "working_process_content" CASCADE;
  DROP TABLE "working_process_content_locales" CASCADE;
  DROP TABLE "trusted_by_content" CASCADE;
  DROP TABLE "trusted_by_content_locales" CASCADE;
  DROP TABLE "why_choose_content_features" CASCADE;
  DROP TABLE "why_choose_content_features_locales" CASCADE;
  DROP TABLE "why_choose_content" CASCADE;
  DROP TABLE "why_choose_content_locales" CASCADE;
  DROP TABLE "contact_content_location_lines" CASCADE;
  DROP TABLE "contact_content_location_lines_locales" CASCADE;
  DROP TABLE "contact_content" CASCADE;
  DROP TABLE "contact_content_locales" CASCADE;
  DROP TABLE "contact_hero_content" CASCADE;
  DROP TABLE "contact_hero_content_locales" CASCADE;
  DROP TABLE "feature_grid_content_features" CASCADE;
  DROP TABLE "feature_grid_content_features_locales" CASCADE;
  DROP TABLE "feature_grid_content" CASCADE;
  DROP TABLE "feature_grid_content_locales" CASCADE;
  DROP TABLE "common_cta_content" CASCADE;
  DROP TABLE "common_cta_content_locales" CASCADE;
  DROP TABLE "contact_cta_content" CASCADE;
  DROP TABLE "contact_cta_content_locales" CASCADE;
  DROP TABLE "content_split_content_section2_features" CASCADE;
  DROP TABLE "content_split_content_section2_features_locales" CASCADE;
  DROP TABLE "content_split_content" CASCADE;
  DROP TABLE "content_split_content_locales" CASCADE;
  DROP TABLE "tabbed_showcase_content_tabs" CASCADE;
  DROP TABLE "tabbed_showcase_content_tabs_locales" CASCADE;
  DROP TABLE "tabbed_showcase_content" CASCADE;
  DROP TABLE "tabbed_showcase_content_locales" CASCADE;
  DROP TABLE "testimonials_content_list" CASCADE;
  DROP TABLE "testimonials_content_list_locales" CASCADE;
  DROP TABLE "testimonials_content" CASCADE;
  DROP TABLE "testimonials_content_locales" CASCADE;
  DROP TABLE "faq_content_categories" CASCADE;
  DROP TABLE "faq_content_categories_locales" CASCADE;
  DROP TABLE "faq_content_list" CASCADE;
  DROP TABLE "faq_content_list_locales" CASCADE;
  DROP TABLE "faq_content" CASCADE;
  DROP TABLE "faq_content_locales" CASCADE;
  DROP TABLE "pricing_content_plans_features" CASCADE;
  DROP TABLE "pricing_content_plans_features_locales" CASCADE;
  DROP TABLE "pricing_content_plans" CASCADE;
  DROP TABLE "pricing_content_plans_locales" CASCADE;
  DROP TABLE "pricing_content" CASCADE;
  DROP TABLE "pricing_content_locales" CASCADE;
  DROP TABLE "gradient_cta_content" CASCADE;
  DROP TABLE "gradient_cta_content_locales" CASCADE;
  DROP TABLE "contact_us_content_form_company_size_options" CASCADE;
  DROP TABLE "contact_us_content_form_company_size_options_locales" CASCADE;
  DROP TABLE "contact_us_content" CASCADE;
  DROP TABLE "contact_us_content_locales" CASCADE;
  DROP TABLE "footer_content" CASCADE;
  DROP TABLE "footer_content_locales" CASCADE;
  DROP TABLE "blog_section_content" CASCADE;
  DROP TABLE "blog_section_content_locales" CASCADE;
  DROP TABLE "blog_content" CASCADE;
  DROP TABLE "blog_content_locales" CASCADE;
  DROP TABLE "metadata_content" CASCADE;
  DROP TABLE "metadata_content_locales" CASCADE;
  DROP TABLE "privacy_content_sections_points" CASCADE;
  DROP TABLE "privacy_content_sections_points_locales" CASCADE;
  DROP TABLE "privacy_content_sections" CASCADE;
  DROP TABLE "privacy_content_sections_locales" CASCADE;
  DROP TABLE "privacy_content_additional_sections_points" CASCADE;
  DROP TABLE "privacy_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "privacy_content_additional_sections" CASCADE;
  DROP TABLE "privacy_content_additional_sections_locales" CASCADE;
  DROP TABLE "privacy_content" CASCADE;
  DROP TABLE "privacy_content_locales" CASCADE;
  DROP TABLE "terms_content_sections_points" CASCADE;
  DROP TABLE "terms_content_sections_points_locales" CASCADE;
  DROP TABLE "terms_content_sections" CASCADE;
  DROP TABLE "terms_content_sections_locales" CASCADE;
  DROP TABLE "terms_content_additional_sections_points" CASCADE;
  DROP TABLE "terms_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "terms_content_additional_sections" CASCADE;
  DROP TABLE "terms_content_additional_sections_locales" CASCADE;
  DROP TABLE "terms_content" CASCADE;
  DROP TABLE "terms_content_locales" CASCADE;
  DROP TABLE "security_content_sections_points" CASCADE;
  DROP TABLE "security_content_sections_points_locales" CASCADE;
  DROP TABLE "security_content_sections" CASCADE;
  DROP TABLE "security_content_sections_locales" CASCADE;
  DROP TABLE "security_content_additional_sections_points" CASCADE;
  DROP TABLE "security_content_additional_sections_points_locales" CASCADE;
  DROP TABLE "security_content_additional_sections" CASCADE;
  DROP TABLE "security_content_additional_sections_locales" CASCADE;
  DROP TABLE "security_content" CASCADE;
  DROP TABLE "security_content_locales" CASCADE;`)
}

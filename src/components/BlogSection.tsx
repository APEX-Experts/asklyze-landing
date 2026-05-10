import { getPayload } from "@/lib/payload";
import { Post } from "@/../payload-types";
import BlogCarousel from "./BlogCarousel";
import { Dictionary } from "@/get-dictionary";

type Props = {
  dict: Dictionary["blogSection"];
  blogDict: Dictionary["blog"];
  lang: "en" | "ar";
};

const BlogSection = async ({ dict, blogDict, lang }: Props) => {
  if (dict.isEnabled === false) return null;

  const { title, subtitle, showAll } = dict;

  const payload = await getPayload();
  const { docs: rawDocs } = await payload.find({
    collection: "posts",
    limit: 9,
    sort: "-publishedDate",
  });

  const posts: Post[] = rawDocs
    .filter((post) => post.slug)
    .map((post) => ({
      id: post.id,
      slug: post.slug ?? "",
      title: lang === "ar" && post.titleAr ? post.titleAr : post.title,
      titleAr: post.titleAr ?? undefined,
      excerpt: lang === "ar" && post.excerptAr ? post.excerptAr : post.excerpt,
      excerptAr: post.excerptAr ?? undefined,
      category: post.category,
      author: {
        name: post.author.name,
        image: post.author.image ?? "/favicon-light.png",
        jobTitle:
          lang === "ar" && post.author.jobTitleAr
            ? post.author.jobTitleAr
            : (post.author.jobTitle ?? undefined),
        jobTitleAr: post.author.jobTitleAr ?? undefined,
      },
      date: new Date(post.publishedDate).toLocaleDateString(
        lang === "ar" ? "ar-EG" : "en-US",
        { year: "numeric", month: "short", day: "numeric" }
      ),
      publishedDate: post.publishedDate,
      image: post.image,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    }));

  return (
    <section className="py-12 md:py-16 px-4 md:px-8 lg:px-24">
      <div className="max-w-full flex flex-col items-center mx-auto bg-bg-card rounded-5xl gap-10 justify-center py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
        {/* Heading */}
        <div className="flex flex-col items-center gap-2.5">
          <h2 className="text-3xl lg:text-[40px] font-bold text-center text-primary-dark">
            {title}
          </h2>
          <p className="text-text-body text-lg leading-7 text-center">
            {subtitle}
          </p>
        </div>

        {/* Blog Cards Carousel */}
        <BlogCarousel
          posts={posts}
          lang={lang}
          showAll={showAll}
          blogDict={blogDict}
        />
      </div>
    </section>
  );
};

export default BlogSection;

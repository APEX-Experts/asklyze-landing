import { BlogPost } from "@/types/blog";

export const blogData: BlogPost[] = [
  {
    id: 1,
    slug: "how-to-use-asklyze-ai",
    title: "How to Use ASKLYZE.ai",
    titleAr: "كيفية استخدام ASKLYZE.ai",
    excerpt:
      "A practical walkthrough for installing ASKLYZE in Oracle APEX, connecting your API key, validating the setup, and safely exposing the right tables.",
    excerptAr:
      "دليل عملي لتثبيت ASKLYZE داخل Oracle APEX وربط مفتاح API والتحقق من الإعداد وتحديد الجداول المسموح بها بأمان.",
    category: "Tutorial",
    author: {
      name: "ASKLYZE Team",
      image: "/favicon-light.png",
      jobTitle: "Product Team",
      jobTitleAr: "فريق المنتج",
    },
    date: "Mar 18, 2026",
    publishedDate: "2026-03-18T00:00:00.000Z",
    image: "/blog-how-to-use-asklyze.svg",
    heroImage: "/asklyze-demo.gif",
    contentHtml: `
      <p>
        ASKLYZE brings natural-language analytics directly into Oracle APEX, so teams can move from a business question to a working result without exporting data into a separate BI workflow.
        Once the plug-in is in place, users can ask in plain language and receive SQL-backed answers, reports, and dashboards inside the same application they already use.
      </p>
      <p>
        This article turns the plug-in setup into a practical onboarding flow. It follows the product's real installation path, but it is organized as a blog guide for teams that want a clean first deployment without guesswork.
      </p>

      <h2>Before you start</h2>
      <p>A smooth installation depends on having the APEX layer, database access, and product credentials ready before you begin.</p>
      <ul>
        <li>An Oracle APEX application where ASKLYZE will be added</li>
        <li>Database permissions to install the required objects</li>
        <li>The ASKLYZE package with database scripts and the APEX plug-in file</li>
        <li>A valid ASKLYZE API key for authentication</li>
      </ul>

      <h2>Step 1. Install the database layer first</h2>
      <p>
        Begin with the SQL objects that support the plug-in. ASKLYZE depends on those objects before the APEX region can operate correctly, so this step comes before anything in the builder.
      </p>
      <p>
        If you are using SQLcl or SQL*Plus, launch the main installer from inside the database folder so all referenced scripts resolve in the right place.
        If you prefer APEX SQL Scripts, upload the database files there and execute the same installer through the workspace.
      </p>
      <blockquote>
        One of the easiest ways to break a clean install is running the main SQL file from the wrong folder context. Keep the database files together and start from the expected location.
      </blockquote>

      <h2>Step 2. Import the ASKLYZE plug-in into Oracle APEX</h2>
      <p>
        After the database layer is ready, move to Shared Components in the target application and import the ASKLYZE region plug-in.
        This makes ASKLYZE available as a native region type, which is important because the product is meant to live directly inside your APEX experience.
      </p>
      <p>
        At this point, the application is prepared to host ASKLYZE on any page where you want conversational analytics and dashboard generation.
      </p>

      <h2>Step 3. Add your API key</h2>
      <p>
        Open the imported plug-in settings and enter the API key assigned to your ASKLYZE environment.
        This is what allows the region to authenticate and process user questions through the ASKLYZE service layer.
      </p>
      <p>
        It is worth validating the key early. If the key is incorrect or missing, the UI may render, but the connection test and AI workflow will fail later.
      </p>

      <h2>Step 4. Add ASKLYZE to a page</h2>
      <p>
        Create a region on the target page and set its type to the ASKLYZE plug-in.
        For the best first impression, give the component room to breathe and avoid surrounding it with a crowded page layout.
      </p>
      <ul>
        <li>Use a simple page template where the analytics region has enough space</li>
        <li>Prefer a minimal region template with as little chrome as possible</li>
        <li>Leave enough width for dashboards, result grids, and charts to render comfortably</li>
      </ul>

      <h2>Step 5. Run the connection test from the live page</h2>
      <p>
        Load the page in the browser and use the built-in connection test to confirm the plug-in is talking to ASKLYZE correctly.
        This needs to happen from the running page because the front-end connection is established when the region initializes.
      </p>
      <p>
        If the test does not pass, fix that before moving to data configuration. Early failures usually point to a missing key, an incomplete install, or a page that is not loading the region correctly.
      </p>

      <h2>Step 6. Whitelist the data ASKLYZE is allowed to see</h2>
      <p>
        Once the connection is healthy, open Data Configuration and explicitly choose the schemas and tables ASKLYZE can work with.
        This is a core governance step, not just a setup detail.
      </p>
      <p>
        Strong teams usually start with a narrow set of high-value tables instead of exposing everything at once. That gives the AI better context and makes validation much easier.
      </p>
      <ul>
        <li>Start with the tables tied to the most important reporting workflow</li>
        <li>Add clear business descriptions where technical names are ambiguous</li>
        <li>Expand the scope after the first workflow is validated by real users</li>
      </ul>

      <h2>What happens after setup</h2>
      <p>
        After installation, ASKLYZE can turn a user question into SQL, execute that query against your Oracle environment, and return the answer inside APEX as a report or dashboard.
        That is the operational win: faster access to insight without moving production data into another analytics stack.
      </p>

      <h2>A smart first rollout</h2>
      <p>
        Do not start with the most complex schema in the business. A better launch plan is to pick a single reporting use case, such as sales activity, service operations, or finance summaries, and use it to validate the experience end to end.
      </p>
      <p>
        That gives you a controlled way to test naming clarity, access boundaries, and dashboard quality before the scope grows.
      </p>

      <h2>Final checklist</h2>
      <ul>
        <li>Database objects installed successfully</li>
        <li>ASKLYZE plug-in imported into the correct application</li>
        <li>API key saved in plug-in settings</li>
        <li>ASKLYZE region added to a live page</li>
        <li>Connection test passed in the browser</li>
        <li>Allowed schemas and tables selected deliberately</li>
      </ul>

      <p>
        If you want to move faster after the first test, keep the initial scope focused, validate the first dashboards with business stakeholders, and then widen the data boundary in controlled steps.
      </p>
      <p>
        <a href="https://asklyze.ai" target="_blank" rel="noopener noreferrer">Explore ASKLYZE.ai</a>
      </p>
    `,
  },
];

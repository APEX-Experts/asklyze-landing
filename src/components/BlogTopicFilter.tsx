"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import TabSelector from "./TabSelector";
import { useTransition } from "react";

interface BlogTopicFilterProps {
  topics: string[];
  localizedTopics: Record<string, string>;
  selectedTopic: string;
}

export default function BlogTopicFilter({
  topics,
  localizedTopics,
  selectedTopic,
}: BlogTopicFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (localizedTab: string) => {
    // Find the original topic key from the localized title
    const originalTopic = topics.find(
      (t) => (localizedTopics[t] || t) === localizedTab
    );

    if (!originalTopic) return;

    const params = new URLSearchParams(searchParams.toString());
    if (originalTopic === "All") {
      params.delete("topic");
    } else {
      params.set("topic", originalTopic);
    }
    params.delete("page");

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  const tabs = topics.map((t) => localizedTopics[t] || t);
  const activeTab = localizedTopics[selectedTopic] || selectedTopic;

  return (
    <div className={isPending ? "opacity-70 transition-opacity" : ""}>
      <TabSelector
        tabs={tabs}
        activeTab={activeTab}
        onChange={handleTabChange}
        layoutId="blogTopicTabs"
      />
    </div>
  );
}

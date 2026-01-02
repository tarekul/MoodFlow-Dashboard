import { ArrowLeft, Plus, Sparkles, Tag, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tagsAPI } from "../utils/api";

const IDENTITY_OPTIONS = [
  // --- MIND & SOUL ---
  {
    id: "reader",
    label: "Reader",
    icon: "📚",
    related_tags: ["Reading", "Audiobook"],
  },
  {
    id: "meditator",
    label: "Meditator",
    icon: "🧘",
    related_tags: ["Meditation", "Mindfulness", "Breathwork"],
  },
  {
    id: "learner",
    label: "Lifelong Learner",
    icon: "🧠",
    related_tags: ["Learning", "Coursework", "Studying"],
  },
  {
    id: "stoic",
    label: "Stoic",
    icon: "🏛️",
    related_tags: ["Journaling", "Reflection", "Philosophy"],
  },
  // --- BODY & HEALTH ---
  {
    id: "runner",
    label: "Runner",
    icon: "🏃",
    related_tags: ["Running", "Sprints", "Marathon Prep"],
  },
  {
    id: "lifter",
    label: "Weightlifter",
    icon: "🏋️",
    related_tags: ["Gym", "Weightlifting", "Recovery"],
  },
  {
    id: "yogi",
    label: "Yogi",
    icon: "🧘‍♀️",
    related_tags: ["Yoga", "Stretching", "Mobility"],
  },
  {
    id: "biohacker",
    label: "Biohacker",
    icon: "🧪",
    related_tags: ["Fasting", "Cold Plunge", "Sauna", "Supplements"],
  },
  {
    id: "hiker",
    label: "Hiker",
    icon: "🥾",
    related_tags: ["Hiking", "Nature", "Walking"],
  },
  {
    id: "cyclist",
    label: "Cyclist",
    icon: "🚴",
    related_tags: ["Cycling", "Biking"],
  },
  // --- WORK & AMBITION ---
  {
    id: "dev",
    label: "Developer",
    icon: "💻",
    related_tags: ["Coding", "Deep Work", "Side Project", "Debugging"],
  },
  {
    id: "founder",
    label: "Entrepreneur",
    icon: "🚀",
    related_tags: ["Business Strategy", "Networking", "Sales"],
  },
  {
    id: "student",
    label: "Student",
    icon: "🎒",
    related_tags: ["Homework", "Class", "Exam Prep"],
  },
  {
    id: "creator",
    label: "Content Creator",
    icon: "📹",
    related_tags: ["Filming", "Editing", "Writing Script"],
  },
  {
    id: "investor",
    label: "Investor",
    icon: "📈",
    related_tags: ["Market Research", "Finance", "Trading"],
  },
  // --- CREATIVITY ---
  {
    id: "writer",
    label: "Writer",
    icon: "✍️",
    related_tags: ["Writing", "Editing", "Creative Flow"],
  },
  {
    id: "artist",
    label: "Artist",
    icon: "🎨",
    related_tags: ["Drawing", "Painting", "Designing"],
  },
  {
    id: "musician",
    label: "Musician",
    icon: "🎸",
    related_tags: ["Practice", "Jamming", "Songwriting"],
  },
  // --- LIFESTYLE ---
  {
    id: "gamer",
    label: "Gamer",
    icon: "🎮",
    related_tags: ["Gaming", "Esports", "Stream"],
  },
  {
    id: "foodie",
    label: "Chef/Foodie",
    icon: "🍳",
    related_tags: ["Cooking", "Meal Prep", "Baking"],
  },
  {
    id: "parent",
    label: "Parent",
    icon: "👶",
    related_tags: ["Family Time", "Kids", "School Run"],
  },
];

const IdentitySelector = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);
  const [existingUserTags, setExistingUserTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [customTagInput, setCustomTagInput] = useState("");
  const [manualTags, setManualTags] = useState([]);

  // --- 1. Compute Active System Tags (Memoized on render) ---
  const activeSystemTags = new Set(
    selected.flatMap(
      (id) => IDENTITY_OPTIONS.find((opt) => opt.id === id).related_tags
    )
  );

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await tagsAPI.getUserTags();
        setExistingUserTags(tags);

        const existingTagNames = new Set(tags.map((t) => t.tag_name));
        const activeIdentities = [];
        const systemTags = new Set();

        // Identify Active Presets
        IDENTITY_OPTIONS.forEach((opt) => {
          const hasOverlap = opt.related_tags.some((tag) =>
            existingTagNames.has(tag)
          );
          if (hasOverlap) {
            activeIdentities.push(opt.id);
            opt.related_tags.forEach((t) => systemTags.add(t));
          }
        });

        // Identify Manual Tags
        const manual = tags.filter((t) => !systemTags.has(t.tag_name));
        setManualTags(manual);
        setSelected(activeIdentities);
      } catch (err) {
        console.error("Failed to load tags", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTags();
  }, []);

  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((x) => x !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const addManualTag = (e) => {
    e.preventDefault();
    if (!customTagInput.trim()) return;

    const tagName = customTagInput.trim();

    // Check duplication against MANUAL tags
    const isManualDuplicate = manualTags.some(
      (t) => t.tag_name.toLowerCase() === tagName.toLowerCase()
    );

    // Check duplication against SYSTEM tags (Don't add if Identity already covers it)
    const isSystemDuplicate = activeSystemTags.has(tagName);

    if (isSystemDuplicate) {
      alert(`"${tagName}" is already included in your selected Identities!`);
      setCustomTagInput("");
      return;
    }

    if (!isManualDuplicate) {
      setManualTags([...manualTags, { id: null, tag_name: tagName }]);
    }
    setCustomTagInput("");
  };

  const removeManualTag = (tagName) => {
    setManualTags(manualTags.filter((t) => t.tag_name !== tagName));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const presetTags = Array.from(activeSystemTags);
      const manualTagNames = manualTags.map((t) => t.tag_name);
      const desiredTagNames = new Set([...presetTags, ...manualTagNames]);
      const currentTagNames = new Set(existingUserTags.map((t) => t.tag_name));

      // Additions
      const tagsToAdd = [...desiredTagNames].filter(
        (name) => !currentTagNames.has(name)
      );
      // Deletions
      const tagsToDelete = existingUserTags.filter(
        (t) => !desiredTagNames.has(t.tag_name)
      );

      const promises = [];
      tagsToAdd.forEach((tagName) => promises.push(tagsAPI.createTag(tagName)));
      tagsToDelete.forEach((tagObj) =>
        promises.push(tagsAPI.deleteTag(tagObj.id))
      );

      await Promise.all(promises);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to sync tags:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-8 relative">
      <button
        onClick={() => navigate("/dashboard")}
        className="absolute top-4 left-4 sm:top-8 sm:left-8 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
        title="Back to Dashboard"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mt-8 sm:mt-0 mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          Define Your Context
        </h2>

        {/* --- NEW: VALUE PROPOSITION CARD --- */}
        <div className="max-w-2xl mx-auto bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-left flex gap-4 shadow-sm">
          <div className="bg-white p-2 rounded-full h-fit shadow-sm text-indigo-600">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-indigo-900 text-sm mb-1">
              How we use this data
            </h3>
            <p className="text-sm text-indigo-800/80 leading-relaxed">
              We analyze your tags to find <strong>hidden patterns</strong> in
              your life. (e.g., <em>"Does 'Running' boost your focus?"</em> or{" "}
              <em>"Does 'Gaming' lower your stress?"</em>).
              <br className="mb-2" />
              These also become your <strong>One-Tap Buttons</strong> for fast
              daily logging.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mb-8">
        {IDENTITY_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-2 h-full hover:scale-[1.02] active:scale-95 ${
              selected.includes(opt.id)
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 shadow-md ring-1 ring-indigo-200"
                : "border-gray-100 bg-white hover:border-indigo-200 text-gray-600 shadow-sm"
            }`}
          >
            <span className="text-3xl">{opt.icon}</span>
            <span className="font-bold text-sm">{opt.label}</span>
          </button>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mb-10 bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Plus size={16} /> Add Custom Tags
          </h3>
          <form onSubmit={addManualTag} className="flex gap-2">
            <input
              type="text"
              value={customTagInput}
              onChange={(e) => setCustomTagInput(e.target.value)}
              placeholder="e.g. Pottery, Jiu Jitsu, Guitar"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={!customTagInput.trim()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Add
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Tag size={16} /> Your Context Buttons
          </h3>

          <div className="flex flex-wrap gap-2">
            {/* System Tags */}
            {Array.from(activeSystemTags).map((tag, idx) => (
              <div
                key={`sys-${idx}`}
                className="bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium text-indigo-700 select-none"
              >
                <span>{tag}</span>
              </div>
            ))}

            {/* Manual Tags */}
            {manualTags.map((tag, idx) => (
              <div
                key={`man-${idx}`}
                className="bg-white border border-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-700 shadow-sm group hover:border-red-300 transition-colors cursor-pointer"
                onClick={() => removeManualTag(tag.tag_name)}
                title="Click to remove"
              >
                <span>{tag.tag_name}</span>
                <X
                  size={14}
                  className="text-gray-400 group-hover:text-red-500"
                />
              </div>
            ))}

            {activeSystemTags.size === 0 && manualTags.length === 0 && (
              <p className="text-gray-400 text-sm italic py-2">
                No context selected. Your log entry screen will be empty!
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto sticky bottom-6">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
        >
          {saving ? "Syncing..." : "Save Context & Continue"}
        </button>
      </div>
    </div>
  );
};

export default IdentitySelector;

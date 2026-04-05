-- ══════════════════════════════════════════════════════════════════
-- Meridian — Seed Data
-- Run AFTER schema.sql to insert Jerah Reeves as the first client.
-- Copy the generated UUID — you'll need it in n8n workflow Code nodes.
-- ══════════════════════════════════════════════════════════════════

insert into clients (
  name,
  title,
  core_thesis,
  followers,
  linkedin_token_expires_at,
  voice_profile
) values (
  'Jerah Reeves',
  'Gen-Z Business Dean | Binghamton University SOM',
  'I help Gen-Z thrive in the future of work.',
  2486,
  now() + interval '60 days',  -- update this when you complete LinkedIn OAuth
  '{
    "toneMarkers": [
      "Direct without being blunt",
      "Evidence-backed but not academic",
      "Uses athletic metaphors for leadership concepts",
      "Ends with a single, concrete question for engagement",
      "Writes like a trusted mentor speaking frankly, not a brand"
    ],
    "avoidList": [
      "Buzzwords: disrupt, synergy, thought leader, paradigm shift",
      "Passive voice",
      "Starting sentences with I",
      "Hashtags in the post body",
      "Em dashes as decoration",
      "Exclamation points"
    ],
    "contentPillars": [
      "Gen-Z professional development and career transitions",
      "University business education and student success",
      "Corporate culture and workforce trends",
      "Athletic discipline applied to leadership",
      "First-generation college students"
    ],
    "postStructure": "Hook (1-2 lines) → Tension or observation → Evidence or story → Bridge to principle → Concrete question"
  }'::jsonb
)
returning id, name, title;
-- ↑ Copy the UUID from this result into your n8n workflow Code nodes

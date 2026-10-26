import re

filepath = r'd:/Projects/react Projects/ai portfolio/project/src/sections/Hero.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the bio paragraph and replace it
old_text = 'Published paper in ASE 2026. I am a research engineer specializing'
if old_text in content:
    # Find start and end of that paragraph content
    start = content.find(old_text)
    # find end - "impact{" + rest
    end_marker = 'impact{" "}'
    end = content.find(end_marker, start) + len(end_marker)
    
    new_text = '''Senior Researcher at{" "}
              <strong style={{ color: "var(--primary-400)" }}>Accenture Labs</strong>{" "}
              and published author at{" "}
              <strong style={{ color: "var(--accent-400)" }}>IEEE/ACM ASE 2026 (CORE A*)</strong>.
              Research engineer specializing in Agentic AI, LLMs, and applied
              software engineering. Self-taught engineer who designs and builds
              scalable, high-performance applications \u2014 crafting solutions
              that solve real-world problems and drive measurable impact.{" "}'''
    
    content = content[:start] + new_text + content[end:]
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('NOT FOUND')
    idx = content.find('Published')
    print('Found Published at:', idx)

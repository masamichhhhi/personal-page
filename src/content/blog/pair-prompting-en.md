---
title: "Do Pair Prompting instead of Pair Programming for the AI Era"
publishedAt: 2026-03-23
summary: "An exploration of pair prompting, a modern take on pair programming for AI-assisted development, based on what I’ve observed while reviewing more AI-generated code."
tags: ["ai", "development-process", "prompt-engineering", "pair-programming", "agile"]
---

## Introduction

AI-assisted coding is becoming the norm, and one thing I keep hearing — and feeling myself — is that code review has become a serious bottleneck.

That is why I’ve been thinking about **pair prompting**, a modern version of pair programming adapted for this AI-driven workflow. In this post, I’ll explain the idea and share why it seems useful.

## AI Has Made Code Review the New Bottleneck

These days, a huge part of development feels like either writing prompts for AI or reviewing the code AI generated. Those two activities occupy most of the time.

But the problem of code review as a bottleneck did not start with AI. It has been discussed for years.

SmartBear’s analysis of 2,500 code reviews at Cisco found that people can effectively review only about **400 lines of code at a time**, and that after about an hour, attention drops and defect detection falls sharply.

https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/

In other words, reading code, understanding it, and giving feedback has always been a cognitively expensive step.

Then AI arrived and the amount of code being produced exploded. The volume of code that needs review increased, but the speed at which humans can understand context did not change. As a result, an existing bottleneck has started to hit its limit.

There is also a discussion that development slows down exponentially as more approval layers are added — roughly **10x slower per layer**.

https://apenwarr.ca/log/20260316

That is how dominant review is in the development process: it is both necessary and expensive.

## Separating Reviews Humans Should Do From Reviews AI Can Do

The first response to this bottleneck is usually automation. Tools like [Claude Code’s code review](https://code.claude.com/docs/en/code-review) and [CodeRabbit](https://coderabbit.ai) are becoming more common, and they all aim to reduce the review burden.

Still, I think review falls into two different categories:

- reviews humans do not need to do, because AI can handle them
- reviews humans still must do

### Reviews Humans Do Not Need to Do

This part is fairly clear. Reviews based on explicit rules can be delegated to AI.

- Code formatting and style compliance
- Obvious bugs or unused variables
- Whether the code matches the written specification

These checks are already automatable through CI or AI review tools, and in my opinion they should be.

### Reviews Humans Still Must Do

This is the harder part, because these are not things you can fully define with a fixed rule.

- What the correct specification is, including inputs, outputs, and use cases
- Whether the modeling, naming, and design choices are appropriate
- Whether the impact scope is clear and complete

I think these three areas need human judgment, especially in larger systems. They involve codebase context, team decisions, and domain knowledge.

For explicit call sites, AI may be enough to identify impact. But the bugs that actually cause incidents are often hidden in implicit dependencies, long call chains, or edge cases that only appear under complex operations. Those are the kinds of problems you find only if someone first forms the hypothesis that “this area might be wrong.”

And in fast-growing products, implementation alone often does not reveal the intent behind a feature. Documentation helps, of course, but if that context is missing, AI will also miss it when asked to implement or review.

These are the kinds of decisions that teams need to align on through discussion. That matters even more when knowledge is unevenly distributed across the team — for example, when senior and junior engineers work together, or when feature ownership is split across people. I’ve seen that lead to real problems more than once.

## From Pair Programming to Pair Prompting

### Pair Work Has Always Helped Remove Bottlenecks

Extreme Programming includes a practice called [pair programming](http://www.extremeprogramming.org/rules/pair.html). Two people sit at one machine: one drives the implementation, and the other guides the design and reviews the work in real time.

<figure style="max-width: 700px;">
  <img src="/pair-prompting/Pair_programming_1.jpg" alt="An illustration of pair programming" style="width: 100%; border-radius: 0.5rem;" />
  <figcaption style="text-align: center; margin-top: 0.5rem;">A pair programming session</figcaption>
</figure>

I’ve found this to be a practical way to deal with review bottlenecks. When a review queue starts to back up, suggesting a quick screen share and pair session often helps the work flow again.

The reason it works is simple: **implementation and review happen in the same process**, so there is no waiting for a pull request to land before feedback starts. Design discussions also happen in real time, which reduces rework later.

That pattern still makes sense in the AI era. In fact, it may matter even more now that code generation is fast and review has become the scarce resource.

The difference is that the object of pair work has changed. Instead of pairing on code, we now pair on **prompts**. That is what I mean by pair prompting.

### Pair Prompting Means Writing Prompts Together

Pair prompting is the practice of two people collaborating to write a prompt for AI.

Concretely, it looks something like this:

1. The two people describe the feature specification and impact scope together
2. They draft the prompt for the AI side by side
3. They include design direction and constraints in the prompt
4. They review the generated code together, then revise the prompt and regenerate

The key point is that the discussion about requirements and design happens **before** code is written, while the prompt is being written.

If pair programming is “discuss design while writing code,” pair prompting becomes “discuss design while writing the prompt.”

## Tips for Pair Prompting

After trying this a bit, I’ve noticed a few practical habits that help.

### Aim for a Prompt That Produces the Right Result in One Shot

The most important goal is to make a prompt that can generate the correct implementation in one request.

If you need repeated follow-up instructions, that usually means the specification, requirements, or design was not fully settled before the work started.

Many people, including me, have gone through the phase of generating code with AI and then iterating with extra prompts until it looks right. That is unavoidable while working, but I think the final result should ideally avoid that state.

I like to think about it this way:

- The prompt is the source code before compilation
- The generated code is the compilation result

Manually editing generated code feels like editing machine code directly. The next time you need the same feature, you will not be able to reproduce it from the prompt alone.

That is why I follow this process:

1. Run the prompt and inspect the result
2. If the result is incomplete, keep refining it through conversation with the AI. This often reveals missing requirements or design considerations
3. When the output is finally acceptable, ask the AI to revise the prompt so that it can produce the same result in a single shot
4. Revert the implementation changes and test whether the new prompt really works on its own. If not, go back to step 2
5. Treat the final prompt as part of the deliverable

This keeps the prompt — effectively the design document — aligned with the actual implementation. Step 4 is especially important. If the prompt still works after the implementation is reverted, you have something much closer to a reliable spec.

### Write Prompts in a Specification-Driven Format

I also think it helps to standardize the information you expect a prompt to contain. A specification-driven approach, like the one described in [Specification-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html), makes pair prompting easier to discuss.

For example, I find this structure useful:

```text
## Goal
[What problem this implementation should solve]

## Specification
[Inputs, outputs, and use cases]

## Constraints / Design Policy
[What to avoid, and how to align with the existing design]

## Impact Scope
[Files, modules, DB tables, and other areas that will change]
```

Filling in that template together is already a kind of review. It surfaces the points that need agreement before anyone writes code.

## What Makes Pair Prompting Hard

I’ve tried this approach, and there are still plenty of difficult parts.

### Pull Requests Can Get Much Larger

Because AI can generate a lot of code at once, the resulting pull request can become much larger than usual.

Without the context that two people wrote the prompt together, the eventual reviewer may have a very hard time understanding the change. Even later, when someone wants to understand why the implementation took a certain shape, a huge diff bundled into one PR is painful to read.

One thing I think helps is attaching the prompt or plan document to the PR description. If the intent behind the instruction is preserved, it is much easier to review than only staring at the code diff.

That also helps when someone who did not participate in the pair prompting session has to review the PR. In that case, I want them to review the prompt first, not the code alone.

### Natural Language Is Ambiguous

Prompts are still natural language, so unlike code they always carry some ambiguity. Phrases like “properly,” “nicely,” or “follow the existing design” can be interpreted differently by different models.

I still do not know the exact point where a prompt becomes detailed enough for AI to behave as intended. The optimal prompt also changes depending on the model version and model family, so teams need to collect examples of what worked.

It also helps to record which model was used when the implementation was produced.

### Creating a Good Prompt Takes Time

As mentioned above, building a prompt that reliably produces the expected result can take time.

Generating code is much faster than writing it by hand, but it is not instant. Sometimes I still wait around 10 minutes for the output, and that waiting time shows up repeatedly during iteration.

The specification-driven template itself is easy to introduce, but standardizing how much detail to include in the prompt — and how to write the spec — is still difficult.

I think the best format will vary by team and by domain. For now, the only realistic approach is to keep trying things and accumulate the lessons.

## Conclusion

“Pair prompting” may sound like a new concept, but in practice it is still pair programming — just with natural language as the main medium.

What I do find promising is the idea of discussing requirements and design **while writing the prompt**, before code is generated. That seems lower-cost for the team than revisiting decisions after a large code diff already exists.

If your team is feeling the same pressure from AI-generated code and review bottlenecks, I’d encourage you to try it.

## References

- [Best Practices for Code Review](https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/)
- [apenwarr](https://apenwarr.ca/log/20260316)
- [Claude Code Code Review](https://code.claude.com/docs/en/code-review)
- [CodeRabbit](https://coderabbit.ai)
- [Pair Programming](http://www.extremeprogramming.org/rules/pair.html)
- [Martin Fowler: Specification-Driven Development](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)


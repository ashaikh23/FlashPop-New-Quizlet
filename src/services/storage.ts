import { Card, Deck } from '../types';

const STORAGE_KEY = 'aesthetiq_flashcards_v1';

export const STARTER_DECKS: Deck[] = [
  {
    id: 'deck-mental-models',
    title: 'Cognitive Biases & Mental Models',
    description: 'Heuristics, fallacies, and decision-making frameworks to upgrade critical thinking.',
    color: 'violet',
    icon: 'Brain',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 3,
    cards: [
      {
        id: 'c-1',
        term: 'First Principles Thinking',
        definition: 'Boiling a problem down to its most fundamental truths and reasoning upward from there, rather than reasoning by analogy.',
        hint: 'Famously used by Aristotle and Elon Musk',
        example: 'Instead of accepting battery packs cost $600/kWh, breaking down raw material spot prices (lithium, nickel, carbon) to find fundamental cost is $80/kWh.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-2',
        term: 'Confirmation Bias',
        definition: 'The tendency to search for, interpret, favor, and recall information in a way that confirms preexisting beliefs or hypotheses.',
        hint: 'Selecting evidence that already agrees with you',
        example: 'Only reading news outlets and following commentators that echo your own political perspective.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'c-3',
        term: 'Inversion',
        definition: 'Approaching problems backward: contemplating what would guarantee failure, and deliberately avoiding those pitfalls.',
        hint: '"All I want to know is where I\'m going to die, so I\'ll never go there" — Charlie Munger',
        example: 'Instead of asking "How do we make our project succeed?", asking "What would cause this project to fail catastrophically?"',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-4',
        term: 'Occam\'s Razor',
        definition: 'The principle that of two competing theories making the same predictions, the one that makes the fewest assumptions is usually correct.',
        hint: 'Simpler explanations are preferred over complex ones',
        example: 'Hearing hoofbeats and expecting horses rather than zebras.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-5',
        term: 'Anchoring Bias',
        definition: 'The common tendency to rely too heavily on the first piece of information encountered (the "anchor") when making decisions.',
        hint: 'The initial reference point skews all subsequent estimates',
        example: 'A shirt marked down from $120 to $60 feels like a bargain even if its true value is only $35.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-6',
        term: 'Dunning-Kruger Effect',
        definition: 'A cognitive bias where people with limited knowledge or competence in a given domain greatly overestimate their own ability.',
        hint: 'Mount Stupid vs Valley of Despair',
        example: 'A novice chess player after 3 weeks feeling confident they could defeat an international master.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-7',
        term: 'Hanlon\'s Razor',
        definition: 'Never attribute to malice that which is adequately explained by stupidity or negligence.',
        hint: 'Assume incompetence or mistakes before assuming ill intent',
        example: 'A colleague forgetting to reply to an email is likely swamped, not harboring a secret grudge against you.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'c-8',
        term: 'Pareto Principle (80/20 Rule)',
        definition: 'For many outcomes, roughly 80% of consequences come from 20% of the causes.',
        hint: 'Unequal distribution of inputs and outputs',
        example: '80% of software bugs are caused by 20% of code modules.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-aesthetic-math',
    title: 'Aesthetic Math & Beautiful Equations',
    description: 'Profound mathematical symmetries, paradoxes, and equations that describe reality.',
    color: 'cyan',
    icon: 'Sparkles',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
    cards: [
      {
        id: 'm-1',
        term: 'Euler\'s Identity',
        definition: 'e^(i*π) + 1 = 0, considered the most beautiful theorem linking the 5 fundamental mathematical constants (e, i, π, 1, 0).',
        hint: 'Links analysis, algebra, geometry, and arithmetic',
        example: 'Combines exponential growth (e), imaginary numbers (i), circle geometry (π), multiplicative identity (1), and additive identity (0).',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'm-2',
        term: 'Golden Ratio (φ)',
        definition: 'The irrational number (1 + √5)/2 ≈ 1.6180339887..., where the ratio of the sum of quantities to the larger equals the ratio of the larger to the smaller.',
        hint: 'Appears in nautilus shells, spiral galaxies, and classical architecture',
        example: 'If a rectangle with dimensions a and b has ratio a/b = (a+b)/a = φ, cutting off a square leaves another golden rectangle.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'm-3',
        term: 'Fourier Transform',
        definition: 'A mathematical operation that decomposes a function or signal into its constituent frequencies of sinusoidal waves.',
        hint: 'Turning time-domain audio signals into frequency spectrums',
        example: 'MP3 audio compression, MRI medical scanning, and spectrum audio visualizers.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'm-4',
        term: 'Mandelbrot Set',
        definition: 'The set of complex numbers c for which the function f_c(z) = z^2 + c does not diverge when iterated from z = 0, producing infinite fractal boundary complexity.',
        hint: 'Infinite self-similarity upon magnification',
        example: 'Zooming into the boundary produces endlessly repeating seahorses, spirals, and mini-Mandelbrots.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'm-5',
        term: 'Monty Hall Paradox',
        definition: 'A probability puzzle where switching doors in a 3-door game show doubles your probability of winning a car from 1/3 to 2/3.',
        hint: 'The host\'s deliberate reveal of a goat provides new conditional information',
        example: 'Pick door 1 (1/3 chance of car). Host opens door 3 revealing a goat. Door 2 now has 2/3 chance.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'm-6',
        term: 'Möbius Strip',
        definition: 'A surface with only one side and only one continuous boundary curve, formed by giving a half-twist to a strip and joining the ends.',
        hint: 'Non-orientable two-dimensional manifold',
        example: 'An ant walking along the center line can visit both "sides" without ever crossing an edge.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-design-systems',
    title: 'UI/UX & Design Psychology',
    description: 'Human-computer interaction laws, visual hierarchy rules, and ergonomic interface heuristics.',
    color: 'emerald',
    icon: 'Layers',
    createdAt: Date.now() - 86400000 * 1,
    updatedAt: Date.now() - 86400000 * 1,
    cards: [
      {
        id: 'd-1',
        term: 'Fitts\'s Law',
        definition: 'The time required to rapidly move to a target area is a function of the ratio between distance to the target and the width of the target.',
        hint: 'Bigger targets closer to the user are much faster and easier to click',
        example: 'Placing primary action buttons full-width at the bottom of a mobile screen within thumb reach.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'd-2',
        term: 'Hick\'s Law',
        definition: 'The time it takes to make a decision increases logarithmically with the number and complexity of choices presented.',
        hint: 'More choices leads to decision fatigue and slower action',
        example: 'Limiting navigation bars to 4-5 key items or breaking checkout into step-by-step wizards.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'd-3',
        term: 'Affordance',
        definition: 'The perceived and actual properties of an object that indicate how it can possibly be used or manipulated.',
        hint: 'A handle affords pulling; a raised button affords pushing',
        example: 'A button with subtle drop shadow and pill shape visually signals clickability.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'd-4',
        term: 'Gestalt Law of Proximity',
        definition: 'Objects that are close together are perceived by the human visual cortex as forming a group or sharing a relationship.',
        hint: 'Whitespace communicates relatedness',
        example: 'Form input labels positioned closer to their input field than to the previous section.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'd-5',
        term: 'Miller\'s Law',
        definition: 'The average number of objects an average human can hold in working short-term memory is 7 ± 2.',
        hint: 'Chunking information into digestible bite-sized groups',
        example: 'Formatting 10-digit phone numbers into chunks (e.g. (555) 123-4567) or breaking forms into phases.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-biology',
    title: 'AP Biology: Cell & Molecular Mechanics',
    description: 'Cellular respiration, CRISPR genetics, membrane transport, and enzyme kinetics.',
    color: 'emerald',
    icon: 'Atom',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
    cards: [
      {
        id: 'bio-1',
        term: 'Oxidative Phosphorylation',
        definition: 'The metabolic pathway in the inner mitochondrial membrane where ATP is synthesized using energy released by electrons transferring down the electron transport chain to oxygen.',
        hint: 'Fourth and final stage of cellular respiration producing ~30-32 ATP',
        example: 'Chemiosmosis driven by a proton gradient flowing through ATP synthase.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'bio-2',
        term: 'CRISPR-Cas9',
        definition: 'An RNA-guided bacterial defense mechanism repurposed for precision genome editing by inducing targeted double-strand breaks at specific DNA sequences.',
        hint: 'Clustered Regularly Interspaced Short Palindromic Repeats',
        example: 'Using single guide RNA (sgRNA) to knock out mutated genes causing sickle cell anemia.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'bio-3',
        term: 'Facilitated Diffusion',
        definition: 'The passive movement of polar or charged molecules across a biological membrane through transmembrane transport proteins without consuming ATP.',
        hint: 'Passive transport down concentration gradient using helper channels',
        example: 'Glucose entering erythrocytes via GLUT-1 carrier proteins or water movement through aquaporins.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'bio-4',
        term: 'Allosteric Regulation',
        definition: 'The regulation of an enzyme or protein by binding an effector molecule at a site other than the active site, altering its 3D conformation.',
        hint: 'Non-competitive site binding inducing conformational change',
        example: 'ATP acting as an allosteric inhibitor of phosphofructokinase (PFK) to regulate glycolysis.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'bio-5',
        term: 'Law of Independent Assortment',
        definition: 'Mendel\'s second law stating that alleles of two or more different genes sort into gametes completely independently of one another during meiosis.',
        hint: 'Occurs during metaphase I alignment of non-homologous chromosomes',
        example: 'A dihybrid cross of heterozygous seed shape (Rr) and color (Yy) yielding the classical 9:3:3:1 phenotypic ratio.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'bio-6',
        term: 'Endosymbiotic Theory',
        definition: 'The evolutionary model proposing that eukaryotic organelles like mitochondria and chloroplasts originated as free-living prokaryotes engulfed by ancestral cells.',
        hint: 'Supported by circular DNA, 70S ribosomes, and double membranes',
        example: 'Mitochondria possessing their own circular mDNA and replicating independently via binary fission.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-literary-devices',
    title: 'Literary Devices & Rhetorical Figures',
    description: 'Master figurative language, rhetorical strategies, syntactical tropes, and stylistic devices.',
    color: 'rose',
    icon: 'BookOpen',
    createdAt: Date.now() - 86400000,
    updatedAt: Date.now() - 86400000,
    cards: [
      {
        id: 'lit-1',
        term: 'Synecdoche',
        definition: 'A figure of speech in which a part of something is used to represent the whole, or occasionally the whole to represent a part.',
        hint: 'Part for whole, like "all hands on deck" or "new wheels"',
        example: '"The western world watched with bated breath as five hundred boots hit the ground."',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'lit-2',
        term: 'Anaphora',
        definition: 'The deliberate repetition of a word or phrase at the beginning of successive clauses, sentences, or poetic lines to build emotional cadence.',
        hint: 'Famous in speeches like Churchill\'s or MLK\'s',
        example: '"We shall fight on the beaches, we shall fight on the landing grounds, we shall fight in the fields..."',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'lit-3',
        term: 'Chiasmus',
        definition: 'A rhetorical device where words, grammatical structures, or concepts are repeated in reverse order following an ABBA pattern.',
        hint: 'Derived from the Greek letter Chi (X) criss-cross structure',
        example: '"Ask not what your country can do for you — ask what you can do for your country."',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'lit-4',
        term: 'Litotes',
        definition: 'A figure of speech employing an understatement by using double negatives, expressing an affirmative statement by denying its opposite.',
        hint: 'Ironical understatement: "she was not unhappy with the outcome"',
        example: '"The marathon runner was not displeased with her podium finish after months of gruelling training."',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'lit-5',
        term: 'Zeugma',
        definition: 'A rhetorical figure in which a single word (usually a verb) applies to two or more nouns in disparate literal and figurative senses.',
        hint: 'One verb yoking two contrasting objects',
        example: '"He carried a strobe light and the responsibility for the lives of his men."',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'lit-6',
        term: 'Polysyndeton',
        definition: 'The deliberate insertion of multiple coordinating conjunctions (and, but, or) in close succession where commas would typically suffice.',
        hint: 'Overuse of conjunctions creating an overwhelming, breathless rhythm',
        example: '"And the rain descended, and the floods came, and the winds blew, and beat upon that house..."',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'lit-7',
        term: 'Metonymy',
        definition: 'A figure of speech where an entity is referred to not by its own name, but by the name of an attribute or closely associated concept.',
        hint: 'Associated symbol representing an institution ("The pen is mightier than the sword")',
        example: '"The Oval Office announced a new diplomatic initiative today" (referring to the US President).',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-calculus-bc',
    title: 'AP Calculus BC: Core Theorems & Series',
    description: 'Essential theorems, Taylor series approximations, Euler\'s method, and polar area integration.',
    color: 'indigo',
    icon: 'Sparkles',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    cards: [
      {
        id: 'calc-1',
        term: 'Taylor Series Expansion',
        definition: 'The infinite power series representation of a function f(x) centered at x = c: Σ [f⁽ⁿ⁾(c) / n!] * (x - c)ⁿ from n = 0 to infinity.',
        hint: 'When centered at c = 0, this is specifically called a Maclaurin series',
        example: 'eˣ = 1 + x + x²/2! + x³/3! + ... = Σ (xⁿ / n!).',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'calc-2',
        term: 'Lagrange Error Bound',
        definition: 'A theorem bounding the maximum error |R_n(x)| of an nth-degree Taylor polynomial: |R_n(x)| ≤ [M / (n+1)!] * |x - c|ⁿ⁺¹, where M is max |f⁽ⁿ⁺¹⁾(t)|.',
        hint: 'Also known as Taylor\'s Remainder Theorem',
        example: 'Estimating sin(0.5) with a 3rd-degree Maclaurin polynomial and bounding the error below 0.5⁴ / 24 ≈ 0.0026.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'calc-3',
        term: 'Euler\'s Method',
        definition: 'A numerical first-order step-by-step approximation algorithm for solving differential equations dy/dx = f(x, y): y_{n+1} = y_n + f(x_n, y_n) * Δx.',
        hint: 'Chaining tangent line linear approximations together with step size Δx',
        example: 'Approximating y(1) given dy/dx = x + y with initial condition (0, 1) and step size Δx = 0.5.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'calc-4',
        term: 'Integration by Parts',
        definition: 'An integration technique derived from the product rule: ∫ u dv = u*v - ∫ v du, using the LIATE priority rule to choose u (Log, Inverse trig, Algebraic, Trig, Exponential).',
        hint: '∫ u dv = uv - ∫ v du',
        example: 'Solving ∫ x * eˣ dx by choosing u = x, dv = eˣ dx, yielding x*eˣ - eˣ + C.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'calc-5',
        term: 'Logistic Differential Equation',
        definition: 'A differential model of population growth constrained by carrying capacity K: dP/dt = k*P*(1 - P/K), with maximum growth rate occurring at P = K/2.',
        hint: 'Inflection point on logistic S-curve occurs at half carrying capacity',
        example: 'A wildlife reserve with carrying capacity K = 1200 deer growing fastest when population reaches 600.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'calc-6',
        term: 'Alternating Series Test',
        definition: 'An alternating series Σ (-1)ⁿ * b_n (b_n > 0) converges if: (1) lim_{n→∞} b_n = 0, and (2) terms are non-increasing: b_{n+1} ≤ b_n for all n.',
        hint: 'Remainder is strictly bounded by the magnitude of the first omitted term: |R_n| ≤ b_{n+1}',
        example: 'Proving Σ [(-1)ⁿ / n] converges conditionally even though the harmonic series diverges.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'calc-7',
        term: 'Polar Area Integral',
        definition: 'The definite integral computing the area enclosed by a polar curve r = f(θ) between angles α and β: Area = (1/2) * ∫_{α}^{β} [r(θ)]² dθ.',
        hint: 'Summing infinitely thin circular sectors of area 1/2 * r² * dθ',
        example: 'Integrating (1/2) * [3*cos(2θ)]² from -π/4 to π/4 to calculate the area of a single rose petal.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-cs-dsa',
    title: 'Computer Science: Data Structures & Algorithms',
    description: 'Core algorithmic paradigms, asymptotic complexities, tree structures, and graph traversals.',
    color: 'violet',
    icon: 'Code',
    createdAt: Date.now() - 3600000 * 5,
    updatedAt: Date.now() - 3600000 * 5,
    cards: [
      {
        id: 'dsa-1',
        term: 'Dijkstra\'s Algorithm',
        definition: 'A greedy graph search algorithm that calculates the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.',
        hint: 'Frequently implemented with a min-priority queue (min-heap) with O((V + E) log V) time',
        example: 'GPS mapping systems calculating shortest routing distance between transit hubs without negative toll roads.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'dsa-2',
        term: 'Dynamic Programming (DP)',
        definition: 'An algorithmic optimization paradigm that solves complex problems by breaking them down into overlapping subproblems, computing each sub-solution once, and storing it via memoization or tabulation.',
        hint: 'Requires Optimal Substructure and Overlapping Subproblems',
        example: 'Solving the 0/1 Knapsack problem or computing the nth Fibonacci number in O(n) instead of O(2ⁿ) exponential time.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'dsa-3',
        term: 'Trie (Prefix Tree)',
        definition: 'A specialized tree-like search data structure where nodes represent characters along a path, allowing efficient string prefix lookups in O(L) time where L is word length.',
        hint: 'Ideal for autocomplete systems and dictionary spell checkers',
        example: 'A search engine querying all words starting with "algo" in O(4) operations irrespective of dataset size.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'dsa-4',
        term: 'Red-Black Tree',
        definition: 'A self-balancing binary search tree where each node contains a color bit (red or black), with balancing rules that guarantee search, insertion, and deletion in O(log n) worst-case time.',
        hint: 'No two consecutive red nodes; black height is equal along all paths',
        example: 'Internal implementation underlying C++ std::map, std::set, and Java TreeMap.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'dsa-5',
        term: 'Amortized Time Complexity',
        definition: 'The average execution time taken per operation over a worst-case sequence of operations, guaranteeing that occasional expensive steps are offset by numerous cheap steps.',
        hint: 'Dynamic array resizing (e.g. ArrayList, vector) doubles capacity in O(n) but averages O(1) per append',
        example: 'Appending 1,000,000 items to a dynamic array takes O(1) amortized time per insertion despite periodic buffer allocations.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'dsa-6',
        term: 'Topological Sorting',
        definition: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u → v, vertex u comes before vertex v in the ordering.',
        hint: 'Implemented via Kahn\'s in-degree algorithm or Depth-First Search (DFS) post-order reversal',
        example: 'Determining the valid build order for a multi-module software compilation pipeline with dependencies.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-cs-system-design',
    title: 'Computer Science: Distributed Systems & Architecture',
    description: 'CAP theorem, database sharding, caching topologies, and high-availability design patterns.',
    color: 'cyan',
    icon: 'Layers',
    createdAt: Date.now() - 3600000 * 3,
    updatedAt: Date.now() - 3600000 * 3,
    cards: [
      {
        id: 'sys-1',
        term: 'CAP Theorem (Brewer\'s Theorem)',
        definition: 'A fundamental distributed computing theorem stating that a distributed data store can guarantee at most two of three properties simultaneously: Consistency, Availability, and Partition Tolerance.',
        hint: 'In real-world networks where network partitions (P) are inevitable, one must choose between C (strict consistency) and A (high availability)',
        example: 'Spanner choosing CP (Consistency + Partition Tolerance), while Cassandra defaults to AP (Availability + Partition Tolerance).',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'sys-2',
        term: 'Database Sharding',
        definition: 'A horizontal database partitioning architecture where rows of a schema are distributed across multiple autonomous server instances based on a deterministic shard key.',
        hint: 'Allows horizontal scaling beyond single-machine disk and memory limits',
        example: 'Partitioning a multi-tenant SaaS user table by hash(user_id) % num_shards across 16 database clusters.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'sys-3',
        term: 'Consistent Hashing',
        definition: 'A distributed hashing algorithm where both cache nodes and keys are mapped to positions on a virtual 360-degree ring, minimizing key relocation when cluster nodes join or leave.',
        hint: 'Only K/N keys need to be remapped when a node fails, compared to almost 100% with traditional modulo hashing',
        example: 'Distributed caching rings in Memcached, DynamoDB, and Content Delivery Networks (CDNs).',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'sys-4',
        term: 'Cache Invalidation Strategies',
        definition: 'Mechanisms to maintain data integrity between in-memory caches and persistent databases: Write-Through (updates both synchronously), Write-Back (buffers writes in cache, flushes asynchronously), and Cache-Aside (lazy loading).',
        hint: '"There are only two hard things in Computer Science: cache invalidation and naming things" — Phil Karlton',
        example: 'Using a Cache-Aside pattern with a Redis cluster and a 1-hour TTL for e-commerce catalog queries.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'sys-5',
        term: 'Circuit Breaker Pattern',
        definition: 'A microservice resiliency design pattern that monitors for remote service failures; once failures cross a threshold, the breaker trips to fail fast, preventing cascading system collapses.',
        hint: 'Three states: Closed (normal), Open (fail-fast immediately), and Half-Open (trial requests)',
        example: 'Preventing checkout service threads from blocking indefinitely when third-party payment gateway experiences an outage.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'sys-6',
        term: 'Idempotency',
        definition: 'A property of an API operation or message processor where applying it multiple times yields the exact same state and side-effects as applying it once.',
        hint: 'Essential in distributed systems with at-least-once message delivery guarantees',
        example: 'Attaching an idempotency key (e.g. UUID) to a Stripe payment request so duplicate network retries do not double-bill a customer.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-cs-os-concurrency',
    title: 'Computer Science: Operating Systems & Concurrency',
    description: 'Process scheduling, virtual memory, synchronization primitives, deadlocks, and thread safety.',
    color: 'emerald',
    icon: 'Atom',
    createdAt: Date.now() - 3600000 * 2,
    updatedAt: Date.now() - 3600000 * 2,
    cards: [
      {
        id: 'os-1',
        term: 'Coffman Deadlock Conditions',
        definition: 'The four simultaneous prerequisites required for a computational deadlock to occur: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption, and (4) Circular Wait.',
        hint: 'Breaking any ONE of these four conditions mathematically prevents deadlock from occurring',
        example: 'Two threads where Thread A holds Lock 1 and requests Lock 2, while Thread B holds Lock 2 and requests Lock 1.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'os-2',
        term: 'Mutex vs. Counting Semaphore',
        definition: 'A Mutex is a locking mechanism with strict thread ownership (only the thread that acquired it can unlock it); a Semaphore is a signaling counter that regulates concurrent access to N shared resource units.',
        hint: 'Mutex is a binary lock; Semaphore is a bouncer managing max capacity',
        example: 'A database connection pool using a counting semaphore initialized to 10 to allow at most 10 concurrent active queries.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'os-3',
        term: 'Virtual Memory & Demand Paging',
        definition: 'An operating system abstraction mapping contiguous virtual process address spaces to disparate physical RAM frames via hardware Page Tables and the MMU, swapping cold pages to disk swap space.',
        hint: 'Enables processes to utilize more memory than physical RAM and isolates memory between applications',
        example: 'An OS triggering a Page Fault interrupt to load a memory page from an SSD when a program touches unmapped virtual memory.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'os-4',
        term: 'Context Switch',
        definition: 'The operating system procedure of storing the execution state of an active CPU thread/process (registers, program counter, stack pointer) and restoring another to achieve preemptive multitasking.',
        hint: 'Pure computational overhead managed by the OS kernel scheduler',
        example: 'A Linux CFS scheduler switching CPU cores between audio playback threads and background compilation tasks every few milliseconds.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'os-5',
        term: 'Race Condition & Critical Section',
        definition: 'A concurrency flaw where the correctness of a program depends on the non-deterministic interleaving or execution timing of multiple concurrent threads accessing a shared critical section.',
        hint: 'Prevented using synchronization primitives (locks, atomic variables, channels)',
        example: 'Two threads simultaneously executing count++ resulting in lost updates due to non-atomic read-modify-write CPU instructions.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'os-6',
        term: 'Copy-on-Write (CoW)',
        definition: 'An optimization strategy where resource duplicates initially share identical physical memory pages; private copies are only allocated when one process attempts to write/modify data.',
        hint: 'Makes the Unix fork() system call virtually instantaneous',
        example: 'When a process calls fork(), parent and child share read-only memory pages until either process writes to a variable.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  },
  {
    id: 'deck-world-countries',
    title: 'World Geography: Nations, Capitals & Landmarks',
    description: 'Explore global capitals, unique territorial borders, physical geography, and continental wonders.',
    color: 'amber',
    icon: 'Compass',
    createdAt: Date.now() - 3600000,
    updatedAt: Date.now() - 3600000,
    cards: [
      {
        id: 'geo-1',
        term: 'Australia (Capital: Canberra)',
        definition: 'The world\'s sixth-largest country by landmass and the only nation governing an entire continent; its federal capital is Canberra, deliberately selected in 1908 as a compromise between Sydney and Melbourne.',
        hint: 'Located in the Australian Capital Territory (ACT)',
        example: 'Home to the Great Barrier Reef (world\'s largest coral reef system) and the arid Outback covering 70% of the continent.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'geo-2',
        term: 'Switzerland (De Facto Capital: Bern)',
        definition: 'A landlocked mountainous federal republic in Central Europe with four official national languages (German, French, Italian, and Romansh), whose federal government resides in the city of Bern.',
        hint: 'Has maintained armed military neutrality in international conflicts since 1815',
        example: 'Geographically dominated by the Swiss Alps and the Jura mountains, featuring the iconic Matterhorn peak.',
        starred: false,
        mastered: true,
        createdAt: Date.now(),
      },
      {
        id: 'geo-3',
        term: 'Iceland (Capital: Reykjavík)',
        definition: 'An island nation situated on the Mid-Atlantic Ridge where the North American and Eurasian tectonic plates actively diverge, resulting in intense volcanic, geothermal, and geyser activity.',
        hint: 'World\'s northernmost sovereign capital city',
        example: 'Over 85% of Iceland\'s domestic heating and electricity is produced directly from renewable geothermal and hydroelectric sources.',
        starred: true,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'geo-4',
        term: 'Kenya (Capital: Nairobi)',
        definition: 'An East African nation bisected by the Great Rift Valley, with coastline on the Indian Ocean; capital Nairobi hosts the world\'s only wildlife game reserve sharing a direct boundary with a capital city.',
        hint: 'Home to Mount Kenya and the annual Great Wildebeest Migration across the Maasai Mara',
        example: 'Nairobi National Park where free-roaming black rhinos and lions roam against a backdrop of downtown city skyscrapers.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'geo-5',
        term: 'Japan (Capital: Tokyo)',
        definition: 'A stratovolcanic archipelago comprising over 6,800 islands along the Pacific Ring of Fire; the Greater Tokyo Area on Honshu represents the most populous metropolitan area on Earth with ~37 million people.',
        hint: 'Honshu, Hokkaido, Kyushu, and Shikoku form the four main islands',
        example: 'Mount Fuji, an active stratovolcano rising 3,776 meters, located 100 km southwest of Tokyo.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'geo-6',
        term: 'Brazil (Capital: Brasília)',
        definition: 'The fifth-largest country globally by both area and population; its capital Brasília was custom-designed by urban planner Lúcio Costa and architect Oscar Niemeyer in 1960 shaped like an airplane.',
        hint: 'Largest Portuguese-speaking nation in the world',
        example: 'Contains roughly 60% of the Amazon Rainforest, which accounts for more than half of the planet\'s remaining rainforests.',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      },
      {
        id: 'geo-7',
        term: 'Egypt (Capital: Cairo)',
        definition: 'A transcontinental nation bridging Northeast Africa and the Sinai Peninsula of Southwest Asia; populated overwhelmingly along the fertile banks of the Nile River, the world\'s longest river.',
        hint: 'Contains the Suez Canal, connecting the Mediterranean Sea directly to the Red Sea',
        example: 'The Giza Plateau on the outskirts of Cairo, home to the Great Pyramid of Khufu (only surviving ancient wonder).',
        starred: false,
        mastered: false,
        createdAt: Date.now(),
      }
    ]
  }
];

export const storage = {
  loadDecks(): Deck[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        this.saveDecks(STARTER_DECKS);
        return STARTER_DECKS;
      }
      const parsed = JSON.parse(data) as Deck[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Auto-merge any new starter decks into the user's existing collection
        const existingIds = new Set(parsed.map(d => d.id));
        const missing = STARTER_DECKS.filter(sd => !existingIds.has(sd.id));
        if (missing.length > 0) {
          const merged = [...parsed, ...missing];
          this.saveDecks(merged);
          return merged;
        }
        return parsed;
      }
      this.saveDecks(STARTER_DECKS);
      return STARTER_DECKS;
    } catch {
      return STARTER_DECKS;
    }
  },

  saveDecks(decks: Deck[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    } catch (e) {
      console.error('Failed to persist decks to localStorage:', e);
    }
  },

  getDeck(id: string): Deck | undefined {
    const decks = this.loadDecks();
    return decks.find(d => d.id === id);
  },

  saveDeck(updatedDeck: Deck): Deck[] {
    const decks = this.loadDecks();
    const index = decks.findIndex(d => d.id === updatedDeck.id);
    let newDecks: Deck[];
    if (index >= 0) {
      newDecks = [...decks];
      newDecks[index] = { ...updatedDeck, updatedAt: Date.now() };
    } else {
      newDecks = [updatedDeck, ...decks];
    }
    this.saveDecks(newDecks);
    return newDecks;
  },

  deleteDeck(id: string): Deck[] {
    const decks = this.loadDecks().filter(d => d.id !== id);
    this.saveDecks(decks);
    return decks;
  },

  addCard(deckId: string, cardData: Omit<Card, 'id' | 'createdAt'>): Deck | undefined {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === deckId);
    if (deckIndex === -1) return undefined;

    const newCard: Card = {
      ...cardData,
      id: 'card-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };

    const updatedDeck = {
      ...decks[deckIndex],
      cards: [newCard, ...decks[deckIndex].cards],
      updatedAt: Date.now(),
    };

    decks[deckIndex] = updatedDeck;
    this.saveDecks(decks);
    return updatedDeck;
  },

  updateCard(deckId: string, updatedCard: Card): Deck | undefined {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === deckId);
    if (deckIndex === -1) return undefined;

    const cards = decks[deckIndex].cards.map(c => (c.id === updatedCard.id ? updatedCard : c));
    const updatedDeck = {
      ...decks[deckIndex],
      cards,
      updatedAt: Date.now(),
    };

    decks[deckIndex] = updatedDeck;
    this.saveDecks(decks);
    return updatedDeck;
  },

  deleteCard(deckId: string, cardId: string): Deck | undefined {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === deckId);
    if (deckIndex === -1) return undefined;

    const updatedDeck = {
      ...decks[deckIndex],
      cards: decks[deckIndex].cards.filter(c => c.id !== cardId),
      updatedAt: Date.now(),
    };

    decks[deckIndex] = updatedDeck;
    this.saveDecks(decks);
    return updatedDeck;
  },

  toggleCardStar(deckId: string, cardId: string): Deck | undefined {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === deckId);
    if (deckIndex === -1) return undefined;

    const cards = decks[deckIndex].cards.map(c =>
      c.id === cardId ? { ...c, starred: !c.starred } : c
    );

    const updatedDeck = {
      ...decks[deckIndex],
      cards,
      updatedAt: Date.now(),
    };

    decks[deckIndex] = updatedDeck;
    this.saveDecks(decks);
    return updatedDeck;
  },

  toggleCardMastery(deckId: string, cardId: string, mastered?: boolean): Deck | undefined {
    const decks = this.loadDecks();
    const deckIndex = decks.findIndex(d => d.id === deckId);
    if (deckIndex === -1) return undefined;

    const cards = decks[deckIndex].cards.map(c =>
      c.id === cardId ? { ...c, mastered: mastered !== undefined ? mastered : !c.mastered } : c
    );

    const updatedDeck = {
      ...decks[deckIndex],
      cards,
      updatedAt: Date.now(),
    };

    decks[deckIndex] = updatedDeck;
    this.saveDecks(decks);
    return updatedDeck;
  },

  exportAllJSON(): string {
    const decks = this.loadDecks();
    return JSON.stringify(decks, null, 2);
  },

  importJSON(jsonString: string): Deck[] | null {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed)) return null;

      // Validate basic shape
      const validDecks = parsed.filter(
        d => typeof d.id === 'string' && typeof d.title === 'string' && Array.isArray(d.cards)
      );

      if (validDecks.length === 0) return null;

      this.saveDecks(validDecks);
      return validDecks;
    } catch {
      return null;
    }
  },

  importTextCards(deckId: string, text: string): number {
    const lines = text.split('\n');
    let count = 0;
    const newCards: Card[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Detect separator: tab, comma, semicolon, dash, or pipe
      let parts: string[] = [];
      if (trimmed.includes('\t')) {
        parts = trimmed.split('\t');
      } else if (trimmed.includes(' - ')) {
        parts = trimmed.split(' - ');
      } else if (trimmed.includes(' | ')) {
        parts = trimmed.split(' | ');
      } else if (trimmed.includes(';')) {
        parts = trimmed.split(';');
      } else if (trimmed.includes(',')) {
        parts = trimmed.split(',');
      }

      if (parts.length >= 2) {
        const term = parts[0].trim();
        const definition = parts.slice(1).join(' - ').trim();
        if (term && definition) {
          newCards.push({
            id: 'card-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6) + '-' + count,
            term,
            definition,
            createdAt: Date.now(),
            starred: false,
            mastered: false,
          });
          count++;
        }
      }
    }

    if (newCards.length > 0) {
      const decks = this.loadDecks();
      const deckIndex = decks.findIndex(d => d.id === deckId);
      if (deckIndex !== -1) {
        decks[deckIndex].cards = [...newCards, ...decks[deckIndex].cards];
        decks[deckIndex].updatedAt = Date.now();
        this.saveDecks(decks);
      }
    }

    return count;
  },

  resetDefaults(): Deck[] {
    this.saveDecks(STARTER_DECKS);
    return STARTER_DECKS;
  }
};

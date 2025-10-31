# TANURI WEBSITE

The **Tanuri Website** is built with **Next.js** and powered by **Bun** for ultra-fast development and dependency management.  
It serves as the main landing page for Tanuri, showcasing our mission, features, and app information.

---

## Tech Stack

- **Next.js 15** – React framework for production-grade web apps  
- **Bun** – Fast JavaScript runtime and package manager  
- **Tailwind CSS** – Utility-first styling  
- **TypeScript** – Type-safe development  
- **shadcn/UI** – Reusable and elegant UI components  

---

## Prerequisites

Ensure you have the following installed before running the project:

- [**Bun**](https://bun.sh/)  
- [**Node.js (optional)**](https://nodejs.org/) – if you prefer using Node for compatibility  

---

## Development

Start the development server with **Turbopack** (Next.js’ fast bundler):

```bash
bun run dev
```

This runs the command defined in `package.json`:

```json
"dev": "next dev --turbopack"
```

Then, open the site in your browser at:
**[http://localhost:3000](http://localhost:3000)**

---

## Build for Production

To create an optimized production build:

```bash
bun run build
```

To preview the production build:

```bash
bun run start
```

---

## Related

* [Tanuri Mobile App README](./../tanuri-consumer-mobile/README.md)
* [Tanuri Backend README](./../../backend/README.md)

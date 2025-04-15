
import { motion } from "framer-motion"
import { Code, Trophy, ArrowRight, CheckCircle} from "lucide-react"


export default function Landing(){
      return <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <section className="container mx-auto px-4 pt-20 pb-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-medium">Welcome to CodeRush</span>
              </motion.div>
              <motion.h1
                className="text-4xl md:text-6xl font-bold mt-6 mb-6 leading-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Sharpen Your <span className="text-blue-500">Coding Skills</span> With Real Problems
              </motion.h1>
              <motion.p
                className="text-lg text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                A platform created by Saish to help programmers practice and improve their coding skills through carefully
                curated problems. Compete with others and climb the leaderboard!
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a
                  href="/problems"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  Start Solving <ArrowRight size={18} />
                </a>
                <a
                  href="/leaderboard"
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  View Leaderboard <Trophy size={18} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg blur opacity-75"></div>
                <div className="relative bg-gray-900 p-6 rounded-lg border border-gray-800">
                  <pre className="text-sm md:text-base overflow-x-auto">
                    <code className="language-javascript">
                      <span className="text-purple-400">function</span>{" "}
                      <span className="text-blue-400">solveProblem</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-orange-400">problem</span>
                      <span className="text-gray-400">)</span> <span className="text-gray-400">{"{"}</span>
                      <br /> <span className="text-purple-400">const</span>{" "}
                      <span className="text-blue-400">solution</span> <span className="text-gray-400">=</span>{" "}
                      <span className="text-orange-400">analyze</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-orange-400">problem</span>
                      <span className="text-gray-400">);</span>
                      <br /> <span className="text-purple-400">let</span> <span className="text-blue-400">code</span>{" "}
                      <span className="text-gray-400">=</span> <span className="text-green-400">  </span>
                      <span className="text-gray-400">;</span>
                      <br />
                      <br /> <span className="text-purple-400">while</span> <span className="text-gray-400">(</span>
                      <span className="text-gray-400">!</span>
                      <span className="text-orange-400">isSolved</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-orange-400">problem</span>
                      <span className="text-gray-400">)</span>
                      <span className="text-gray-400">)</span> <span className="text-gray-400">{"{"}</span>
                      <br /> <span className="text-blue-400">code</span> <span className="text-gray-400">+=</span>{" "}
                      <span className="text-orange-400">writeCode</span>
                      <span className="text-gray-400">();</span>
                      <br /> <span className="text-orange-400">testSolution</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-blue-400">code</span>
                      <span className="text-gray-400">);</span>
                      <br /> <span className="text-orange-400">refactor</span>
                      <span className="text-gray-400">(</span>
                      <span className="text-blue-400">code</span>
                      <span className="text-gray-400">);</span>
                      <br /> <span className="text-gray-400">{"}"}</span>
                      <br />
                      <br /> <span className="text-purple-400">return</span> <span className="text-blue-400">code</span>
                      <span className="text-gray-400">;</span>
                      <br />
                      <span className="text-gray-400">{"}"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CodeRush?</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                A platform designed by developers, for developers, to help you become a better programmer.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Code className="text-blue-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-World Problems</h3>
                <p className="text-gray-300">
                  Practice with problems that simulate real coding challenges you will face in interviews and on the job.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="text-purple-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Competitive Leaderboard</h3>
                <p className="text-gray-300">
                  Compete with other programmers and track your progress as you climb the ranks on our global leaderboard.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-800 p-6 rounded-lg border border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="text-green-500" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="text-gray-300">
                  Monitor your improvement over time with detailed statistics and performance metrics.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to level up your coding skills?</h2>
                  <p className="text-white/80 mb-6 max-w-lg">
                    Join thousands of developers who are solving problems and improving their skills on CodeRush.
                  </p>
                  <a
                    href="/problems"
                    className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
                  >
                    Start Solving Now <ArrowRight size={18} />
                  </a>
                </div>
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">100+</span>
                    <span className="text-white/80">Problems</span>
                  </div>
                  <div className="w-px h-16 bg-white/20 hidden md:block"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">5K+</span>
                    <span className="text-white/80">Users</span>
                  </div>
                  <div className="w-px h-16 bg-white/20 hidden md:block"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">50K+</span>
                    <span className="text-white/80">Solutions</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-gray-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <a href="/" className="text-2xl font-bold flex items-center">
                  <Code className="mr-2" /> CodeRush
                </a>
                <p className="text-gray-400 mt-2">Created by Saish</p>
              </div>
              <div className="flex gap-6">
                <a href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </a>
                <a href="/problems" className="text-gray-400 hover:text-white transition-colors">
                  Problems
                </a>
                <a href="/leaderboard" className="text-gray-400 hover:text-white transition-colors">
                  Leaderboard
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
              <p>© {new Date().getFullYear()} CodeRush. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
}
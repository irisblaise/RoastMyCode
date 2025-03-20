import { type FC } from 'react';

const Tips: FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          Coding Tips
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Learn best practices for code reviews and improve your development skills
        </p>
      </header>

      <div className="space-y-8">
        <section className="bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
            Code Review Best Practices
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                When Submitting Code
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Keep your code snippets focused and concise</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Include relevant context and requirements</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Format your code properly before submission</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Consider adding comments for complex logic</span>
                </li>
              </ul>
            </div>

            <div className="group bg-gray-50/50 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                Common Issues to Watch
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Inconsistent naming conventions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Duplicate or redundant code</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Missing error handling</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-gray-400">•</span>
                  <span>Poor function or variable names</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tips;

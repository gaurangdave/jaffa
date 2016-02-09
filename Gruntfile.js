module.exports = function (grunt) {

    grunt.initConfig({
        mkdir: {
            all: {
                options: {
                    create: ['tmp', 'test/very/deep/folder']
                },
            },
        },
    })

    grunt.loadNpmTasks('grunt-mkdir');

    grunt.registerTask('jaffa', ['mkdir']);

}

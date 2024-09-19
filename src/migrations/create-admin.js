'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Admin', {
            admin_id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                // references: {
                //     model: 'Account',
                //     key: 'accountId'
                // }
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Admin');
    }
};

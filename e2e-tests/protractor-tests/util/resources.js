/*
 * Copyright 2005-2015 Alfresco Software, Ltd. All rights reserved.
 * License rights for this program may be obtained from Alfresco Software, Ltd.
 * pursuant to a written agreement and any use of this program without such an
 * agreement is prohibited.
 */

/*
 * Created by Lucian Tuca on 04/02/2015.
 */

/**
 * @module util
 */

/**
 * Provides resources used throughout the application
 *
 * @class util.Resources
 */
var exports = module.exports = {};

exports.Files = {
    ALL_FIELDS_APP: {
        file_location: "/resources/all_fields_test.zip",
        title: "All fields",
        id: -2,
        process_definitions: null,
        start_form: null
    },

    UPDATE_USER_TASK_APP: {
        file_location: "/resources/updating_user_tasks.zip",
        title: "Updating user tasks",
        id: -3,
        process_definitions: null,
        start_form: null
    },

    DYNAMIC_TABLE_TEST_APP: {
        file_location: "/resources/dynamic-table-testing.zip",
        title: "dynamic-table-testing",
        id: -4,
        process_definitions: null,
        start_form: null
    },

    REST_FIELDS_TEST_APP: {
        file_location: "/resources/rest-fields-test.zip",
        title: "rest-fields-test",
        id: -5,
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_FIELDS_TEST_APP: {
        file_location: "/resources/visibility-test-app.zip",
        title: "visibility-test-app",
        id: -6,
        process_definitions: null,
        start_form: null
    },
    
    VISIBILITY_WITH_TABS_TEST_APP: {
        file_location: "/resources/visibility-tests-with-tabs-app.zip",
        title: "visibility-tests-with-tabs-app",
        id: -7,
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_FIELDS_TEST_APP_AND_NOT: {
        file_location: "/resources/visibility-test-app-and-not.zip",
        title: "visibility-test-app-and-not",
        id: -8,
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_FIELDS_TEST_APP_OR: {
        file_location: "/resources/visibility-test-app-or.zip",
        title: "visibility-test-app-or",
        id: -9,
        process_name: "visibility-conditions-test-or",
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_FIELDS_TEST_APP_OR_NOT: {
        file_location: "/resources/visibility-test-app-or-not.zip",
        title: "visibility-test-app-or-not",
        id: -10,
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_SINGLE_CONDITION: {
        file_location: "/resources/visibility-tests-fields-app.zip",
        title: "visibility-tests-fields-app",
        id: -10,
        process_definitions: null,
        start_form: null
    },

    VISIBILITY_CONDITIONS_WITH_VARS: {
        file_location: "/resources/apps/App with Form Variables.zip",
        title: "App with Form Variables",
        id: -11,
        process_name: "Process with Form Variables",
        process_definitions: null,
        start_form: null,
        script_task_name: "Set Variables",
        fields: {
            message_text_field: "activiti-message",
            date_field: "activiti-date",
            date_field_label: "Date",
            form_text_field: "activiti-formfield"
        },
        form: {
            name: "Form with Variables",
            fStrVariable: "FStringVar",
            fIntVariable: "FIntVar",
            fBoolVariable: "FBoolVar"
        }
    },

    PRECEDING_TASKS_FIELDS_VALUES: {
        file_location: "/resources/app-fields-values.zip",
        title: "app-fields-values",
        id: -12,
        process_definitions: null,
        start_form: null
    },

    DYNAMIC_TABLE_FIELDS_VALUES: {
        file_location: "/resources/app-dynamic-table-values.zip",
        title: "app-dynamic-table-values",
        id: -13,
        process_definitions: null,
        start_form: null
    },

    DECISION_TABLE_KEY: {
        file_location: "/resources/app-decision-table-key.zip",
        title: "app-decision-table-key",
        id: -14,
        process_definitions: null,
        start_form: null
    },

    DECISION_TABLE_KEY2: {
        file_location: "/resources/app-decision-table-key2.zip",
        title: "app-decision-table-key2",
        id: -15,
        process_definitions: null,
        start_form: null
    },

    DECISION_TABLE_FIRST_RULE: {
        file_location: "/resources/app-decision-table-first-rule.zip",
        title: "app-decision-table-first-rule",
        id: -17,
        process_definitions: null,
        start_form: null
    },

    DECISION_TABLE_ANY_RULE: {
        file_location: "/resources/apps/app-decision-table-any-rule.zip",
        title: "app-decision-table-any-rule",
        id: -18,
        process_definitions: null,
        start_form: null
    },

    DECISION_TABLE_OUTPUT_VARIABLES: {
        file_location: "/resources/OutputVarAppDT.zip",
        title: "Output Var App DT",
        id: -19,
        process_definitions: null,
        start_form: null
    },

    STENCIL_PIE_FORM: {
        file_location: "/resources/stencil_test.zip",
        title: "BPMN Stencil"
    },
    
    SUBPROCESS_APP: {
        file_location: "/resources/SubprocessDemoAppNew.zip",
        title: "SubprocessDemoAppNew",
        id: -16,
        process_definitions: null,
        start_form: null
    },

    STEP_VAR_MAPPING: {
        file_location: "/resources/variable_mapping_test.zip",
        title: "variable mapping test",
        id: -17,
        process_definitions: null,
        start_form: null
    },

    SIMPLE_APP: {
        file_location: "/resources/Simple App.zip",
        title: "Simple App",
        id: -18,
        process_definitions: null,
        start_form: null
    },

    SIMPLE_APP_WITH_USER_FORM: {
        file_location: "/resources/apps/Simple App with User Form.zip",
        title: "Simple App with User Form",
        processName: "Simple Process",
        processDiagramFileLocation: '/resources/apps/SimpleAppWithUserForm.png',
        processThumbnail: '/resources/processes/Simple Process Thumbnail.png',
        formName: "Simple form",
        id: -19,
        taskName: "User Task",
        form_fields: {
           text_field: "activiti-textfield",
            form_fieldId: "textfield",
            text_field_value: "Hi tester, from Rest call"
        }
    },

    WIDGETS_SMOKE_TEST: {
        file_location: "/resources/apps/Widgets smoke test.zip",
        formName: "Widgets smoke test",
        form_fields: {
            text_id: "text",
            header_id: "header",
            number_id: "number",
            amount_id: "amount",
            people_id: "people",
            group_id: "groupofpeople",
            multiline_id: "multilinetext",
            typeahead_id: "typeahead",
            displaytext_id: "displaytext",
            displayvalue_id: "displayvalue",
            hyperlink_id: "hyperlink",
            attachfolder_id: "attachfolder",
            attachfile_id: "attachfile",
            date_id: "date",
            dateTime_id: "dateandtime",
            checkbox_id: "checkbox",
            dropdown_id: "dropdown",
            dropdown_value: "mat-select[id='dropdown'] span span",
            radiobuttons_id: "radiobuttons",
            dynamictable_id: "dynamictable"
        }
    },

    SIMPLE_PROCESS_WITH_USER_FORM: {
        file_location: "/resources/processes/Process1.bpmn20.xml",
        title: "processWithForm",
        name: "Process1.bpmn20.xml",
        id: -100,
        taskName: "User Task",
        image_location: "/resources/processes/Process1.Process1.png"
    },

    BPMN20_PROCESS: {
        file_location: "/resources/processes/Simple Process.bpmn20.xml",
        title: "Simple Process",
        name: "Simple Process.bpmn20.xml",
        id: -100,
        taskName: "User Task"
    },

    APP_WITH_DATE_FIELD_FORM: {
        file_location: "/resources/apps/TestDate.zip",
        title: "TestDate",
        process_title: "TestDateField",
        id: -1,
        form_fields: {
            testdate_field: "activiti-testdate",
            completed_task_date_field: "span[ng-if*='field.dateDisplayFormat']"
        }
    },

    APP_WITH_PROCESSES:{
        file_location:"/resources/apps/App_with_processes.zip",
        title: "App_with_processes",
        task_name: "Task Test 2"
    },

    TEST_PUBLISH_APP:{
        file_location: "/resources/apps/simple_app_to_test.zip",
        title: "simple_app_to_test",
        id: -20,
        process_definitions: null,
        start_form: null
    },
    Group_Manager_APP:{
        file_location: "/resources/task_app_for_primary_group_manager.zip",
        title: "task_app_for_primary_group_manager",
        id: -21,
        process_definition: null,
        start_form: null
    },
    Generate_Document_APP:{
        file_location: "/resources/generate_document.zip",
        title: "generate document",
        id: -22,
        process_definition: "App Doc Template",
        start_form: null,
        generated_templateName: "tenantTemplate.pdf",
        processVariableValue: "Process var: Process variable is set",
        formVariableValue: "Form var: Form variable is set"
    },
    Start_Process_With_Form_APP: {
        file_location: "/resources/apps/startProcessWithFormApp.zip",
        title: "startProcessWithFormApp",
        id: -23,
        form_fields: {
            formFieldId: "welcome",
            formFieldText: "Hi tester, from Rest call"
        }
    },
    Decision_Tables:{
        DTWithValidationError: {
            file_location:"/resources/models/decision_tables/decisionTableWithValidationError.dmn",
            title: "decisionTableWithValidationError",
            noValidationError: "Decision table model contains no validation errors.",
            validationError: "Decision table model contains validation errors."
        }
    },
    TEST_APP_With_ALL_Components:{
        file_location: "/resources/testAppWithAllComponents.zip",
        processTitle: "testProcessWithAllComponents",
        formName: "testForm",
        decisionTableName: "testDecisionTable",
        appName:"testAppWithAllComponents",
        dataModelName:"testDataModel",
        stencilName:"testStencile",
        id: -23,
        process_definitions: null,
        start_form: null
    },
    Documents: {
        PDF: {
            file_location: "/resources/documents/pdf_document.pdf",
            file_name: "pdf_document.pdf",
            mimeType: "application/pdf",
            simpleType: "pdf"
        },

        DOCX: {
            file_location: "/resources/documents/docx_document.docx",
            file_name: "docx_document.docx"
        },

        TXT1: {
            file_location: "/resources/documents/text_1.txt",
            file_name: "text_1.txt"
        },
        TXT2: {
            file_location: "/resources/documents/text_2.txt",
            file_name: "text_2.txt"
        },
        documentTemplate:{
            file_location: "/resources/documents/document_template.docx",
            file_name: "document_template.docx"
        }
    },
    GENERIC_FORM: {
        file_location: "/resources/forms/Generic Form.json",
        file_name: "Generic Form.json",
        title: "Generic Form",
        fields: {
            text_field: "Text Field",
            number_field: "Number Field",
            multi_line_text_field: "Multi-line Text Field",
            radio_buttons: "Radio Buttons",
            dropdown: "Dropdown Field",
            date_field: "Date Field",
            people_field: "People Field",
            group_of_people_filed: "Group of People Field",
            checkbox_field: "Checkbox Field",
            attach_file_field: "Attach File Field",
            dynamic_table_field: "Dynamic Table Field",
            typeahead_field: "Typeahead Field",
            amount_field: "amount_field"
        }
    },

    DYNAMIC_FIELDS_FORM: {
        file_location: "/resources/Forms/form-with-dynamic-field.json",
        file_name: "form-with-dynamic-field.json",
        title: "form-with-dynamic-field",
        fields: {
            dropdown: {
                id: "dropdown",
                name: "Dropdown"
            },
            dynamic_table_field: {
                id: "dynamictable",
                name: "Dynamic table",
                fieldId: 'dropdownId'
            }
        }
    },

    ADF_DOCUMENTS: {
        PDF: {
            file_location: "/resources/adf/allFileTypes/a_file_supported.pdf",
            file_name: "a_file_supported.pdf",
            short_file_name: "a_file",
            first_page_text: "A Journey into Test Frameworks",
            second_page_text: "After looking into Spock’s GitHub",
            last_page_text: "and provide feedback. The main advantages being the readability of the te",
            last_page_number: "8"
        },
        PDF_B: {
            file_location: "/resources/adf/allFileTypes/b_file_supported.pdf",
            file_name: "b_file_supported.pdf"
        },
        PDF_C: {
            file_location: "/resources/adf/allFileTypes/c_file_supported.pdf",
            file_name: "c_file_supported.pdf"
        },
        PDF_D: {
            file_location: "/resources/adf/allFileTypes/d_file_supported.pdf",
            file_name: "d_file_supported.pdf"
        },
        PDF_ALL: {
            file_location: "/resources/adf/allFileTypes/pdf_all_properties.pdf",
            file_name: "pdf_all_properties.pdf"
        },
        LARGE_FILE:{
            file_location: "/resources/adf/BigFile.zip",
            file_name: "BigFile.zip"
        },
        EXCEL: {
            file_location: "/resources/adf/allFileTypes/a_excel_file.xlsx",
            file_name: "a_excel_file.xlsx"
        },
        DOCX: {
            file_location: "/resources/adf/allFileTypes/a_file_unsupported.docx",
            file_name: "a_file_unsupported.docx"
        },
        FOLDER_ONE: {
            folder_location: "/resources/adf/folderOne",
            folder_name: "folderOne"
        },
        FILE_INSIDE_FOLDER_ONE: {
            file_location: "/resources/adf/folderOne/share_profile_pic.png",
            file_name: "share_profile_pic.png"
        },
        JPG: {
            file_location: "/resources/adf/allFileTypes/a_jpg_file.jpg",
            file_name: "a_jpg_file.jpg"
        },
        MP4: {
            file_location: "/resources/adf/allFileTypes/a_mp4_file.mp4",
            file_name: "a_mp4_file.mp4"
        },
        PNG: {
            file_location: "/resources/adf/allFileTypes/a_png_file.png",
            file_name: "a_png_file.png"
        },
        PPT: {
            file_location: "/resources/adf/allFileTypes/a_ppt_file.pptx",
            file_name: "a_ppt_file.pptx",
            first_page_text: "PPTX test file"
        },
        TEST: {
            file_location: "/resources/adf/allFileTypes/testExtension.test",
            file_name: "testExtension.test"
        },
        TXT: {
            file_location: "/resources/adf/allFileTypes/a_txt_file.rtf",
            file_name: "a_txt_file.rtf"
        },
        TXT_400B: {
            file_location: "/resources/adf/allFileTypes/file400Bytes.txt",
            file_name: "file400Bytes.txt"
        },
        TXT_0B: {
            file_location: "/resources/adf/allFileTypes/zeroBytesFile.txt",
            file_name: "zeroBytesFile.txt"
        },
        ZIP: {
            file_location: "/resources/adf/allFileTypes/a_zip_file.mp4.zip",
            file_name: "a_zip_file.mp4.zip"
        },

        PAGES:{
            file_location: "/resources/adf/allFileTypes/file_unsupported.pages",
            file_name: "file_unsupported.pages"
        },
    },

    PROFILE_IMAGES: {
        ECM: {
            file_location: "../../resources/adf/share_profile_pic.jpg",
            file_name: "share_profile_pic.jpg"
        },
        BPM: {
            file_location: "/resources/adf/activiti_profile_pic.png",
            file_name: "activiti_profile_pic.png"
        },
    }

};
